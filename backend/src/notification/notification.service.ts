import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private notificationModel: Model<Notification>,
  ) {}

  // 새 알림 생성
  async createNotification(data: any): Promise<Notification> {
    const newNotification = new this.notificationModel(data);
    return newNotification.save();
  }

  // 특정 사용자의 알림 조회
  async getUserNotifications(
    userObjectId: mongoose.Types.ObjectId,
  ): Promise<Notification[]> {
    return this.notificationModel.find({ recipientId: userObjectId }).exec();
  }

  // 특정 사용자의 '읽지 않은' 알림의 개수 조회
  async getUnreadNotificationCount(
    userObjectId: mongoose.Types.ObjectId,
  ): Promise<number> {
    return this.notificationModel.countDocuments({
      recipientId: userObjectId,
      read: false,
    });
  }

  // 특정 사용자의 모든 알림을 '읽음' 상태로 업데이트
  async markNotificationsAsRead(
    userObjectId: mongoose.Types.ObjectId,
  ): Promise<void> {
    await this.notificationModel.updateMany(
      { recipientId: userObjectId, read: false },
      { $set: { read: true } },
    );
  }
}
