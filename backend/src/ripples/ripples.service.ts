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
    console.log(`Received like for rippleId: ${id}, userId: ${userId}`);
    const ripple = await this.rippleModel.findById(id).exec();
    console.log('찾아낸 ripple 아이디 : ', ripple);
    if (!ripple) {
      throw new NotFoundException('Ripple not found');
    }

    const index = ripple.likedUsers.indexOf(userId);
    if (index === -1) {
      ripple.likedUsers.push(userId);
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
    } else {
      ripple.likedUsers.splice(index, 1); // 이미 '좋아요'한 경우 제거
    }

    return ripple.save();
  }
}
