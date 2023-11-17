import { Injectable, NotFoundException } from '@nestjs/common';
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
    private userService: UserService,
    private fcmService: FcmService,
    private notificationService: NotificationService,
  ) {}

  async create(createRippleDto: CreateRippleDto): Promise<Ripple> {
    const newRipple = new this.rippleModel(createRippleDto);
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
    const ripples = await this.rippleModel
      .find({
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
    return Promise.resolve(
      ripples.map((ripple) =>
        ripple.toObject({ versionKey: false }),
      ) as IRipple[],
    );
  }

  async findMyRipples(userId: string): Promise<Ripple[]> {
    return this.rippleModel.find({ userId: userId }).exec();
  }

  async findLikedRipplesByUser(userId: string): Promise<Ripple[]> {
    return this.rippleModel.find({ likedUsers: userId }).exec();
  }

  async updateLike(id: string, userId: string): Promise<Ripple> {
    const ripple = await this.rippleModel.findById(id).exec();

    if (!ripple) {
      console.log(`Ripple not found with ID: ${id}`);
      throw new NotFoundException('Ripple not found');
    }

    console.log('Before updating likedUsers:', ripple.likedUsers);
    const index = ripple.likedUsers.indexOf(userId);

    if (index === -1) {
      ripple.likedUsers.push(userId); // 사용자가 '좋아요'한 경우 추가
      console.log('After updating likedUsers:', ripple.likedUsers);

      // 리플 생성자가 자신의 리플에 '좋아요'를 누르지 않은 경우에만 처리
      if (ripple.userId === userId) {
        const creator = await this.userService.findByUsername(ripple.userId);

        if (creator && creator.pushToken) {
          console.log('Sending push notification to:', creator);

          this.fcmService.sendNotification(
            creator.pushToken,
            'Ripple',
            `${userId}님이 회원님이 남긴 음악을 좋아합니다.`,
          );

          // 알림 데이터 생성
          const notificationData = {
            recipientId: creator._id,
            senderId: userId,
            type: 'like',
            message: `${userId}님이 회원님이 남긴 음악을 좋아합니다.`,
            referenceId: id,
            albumCoverUrl: ripple.albumCoverUrl,
          };
          console.log('Notification Data:', notificationData);
          await this.notificationService.createNotification(notificationData);
        }
      }
    } else {
      ripple.likedUsers.splice(index, 1); // 이미 '좋아요'한 경우 제거
      console.log('After removing like:', ripple.likedUsers);
    }

    return ripple.save();
  }
}
