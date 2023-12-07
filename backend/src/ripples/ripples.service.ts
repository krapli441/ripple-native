import { Injectable, NotFoundException } from '@nestjs/common';
import { forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { Ripple, IRipple } from './ripples.schema';
import { UserService } from '../user/user.service';
import { FcmService } from '../fcm/fcm.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class RipplesService {
  constructor(
    @InjectModel(Ripple.name) private rippleModel: Model<Ripple>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private fcmService: FcmService,
    private notificationService: NotificationService,
  ) {}

  async create(createRippleDto: CreateRippleDto): Promise<Ripple> {
    const newRipple = new this.rippleModel({
      ...createRippleDto,
      isActive: true, // 활성화 상태로 시작
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 24시간 후 만료 시간 설정
    });
    return newRipple.save();
  }

  async findAll(): Promise<Ripple[]> {
    return this.rippleModel.find().exec();
  }

  async findOne(id: string): Promise<Ripple> {
    return this.rippleModel.findById(id).exec();
  }

  async update(id: string, updateRippleDto: UpdateRippleDto): Promise<Ripple> {
    return this.rippleModel
      .findByIdAndUpdate(id, updateRippleDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Ripple> {
    return this.rippleModel.findByIdAndRemove(id).exec();
  }

  async findNearbyRipples(
    longitude: number,
    latitude: number,
    maxDistance: number,
  ): Promise<IRipple[]> {
    const twentyFourHoursAgo = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1000,
    );

    const ripples = await this.rippleModel
      .find({
        createdAt: { $gte: twentyFourHoursAgo },
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        },
      })
      .exec();

    return ripples.map((ripple) =>
      ripple.toObject({ versionKey: false }),
    ) as IRipple[];
  }

  async findMyRipples(userId: string): Promise<Ripple[]> {
    return this.rippleModel.find({ userId: userId }).exec();
  }

  async findLikedRipplesByUser(userId: string): Promise<Ripple[]> {
    return this.rippleModel.find({ likedUsers: userId }).exec();
  }

  async deleteRipplesByUser(userId: string): Promise<void> {
    await this.rippleModel.deleteMany({ userObjectId: userId }).exec();
  }

  // 사용자가 좋아요한 음악 마커에서 사용자 제거
  async removeLikesByUser(userId: string): Promise<void> {
    await this.rippleModel
      .updateMany({ likedUsers: userId }, { $pull: { likedUsers: userId } })
      .exec();
  }

  async updateLike(id: string, userId: string): Promise<Ripple> {
    const ripple = await this.rippleModel.findById(id).exec();
    if (!ripple) {
      throw new NotFoundException('Ripple not found');
    }

    const index = ripple.likedUsers.indexOf(userId);
    if (index === -1) {
      // 좋아요 추가
      ripple.likedUsers.push(userId);

      // 자신의 마커에 좋아요를 누른 경우 알림 및 푸시 알림을 보내지 않음
      if (userId !== ripple.userId.toString()) {
        await this.notificationService.createNotification({
          recipientId: ripple.userObjectId,
          senderId: userId,
          type: 'like',
          message: `${userId}님이 회원님이 남긴 음악을 좋아합니다.`,
          referenceId: id,
          albumCoverUrl: ripple.albumCoverUrl,
        });

        // 푸시 알림 전송
        const creator = await this.userService.findByUsername(ripple.userId);
        if (creator && creator.pushToken) {
          this.fcmService.sendNotification(
            creator.pushToken,
            'Ripple',
            `${userId}님이 회원님이 남긴 음악을 좋아합니다.`,
          );
        }
      }
    } else {
      // 이미 좋아요한 경우 제거
      ripple.likedUsers.splice(index, 1);
    }

    return ripple.save();
  }
}
