import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notificationModel.find({ recipientId: userId }).exec();
  }

  // 특정 사용자의 '읽지 않은' 알림의 개수 조회
  async getUnreadNotificationCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({ 
      recipientId: userId,
      read: false
    });
  }
}
