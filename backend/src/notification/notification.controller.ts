import { Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Types } from 'mongoose'; // Types import

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  getUserNotifications(@Param('userId') userId: string) {
    const objectId = new Types.ObjectId(userId); // string을 ObjectId로 변환
    return this.notificationService.getUserNotifications(objectId);
  }

  @Get('unread/count/:userId')
  getUnreadNotificationCount(@Param('userId') userId: string) {
    const objectId = new Types.ObjectId(userId); // string을 ObjectId로 변환
    return this.notificationService.getUnreadNotificationCount(objectId);
  }

  @Patch(':userId/mark-read')
  markNotificationsAsRead(@Param('userId') userId: string) {
    const objectId = new Types.ObjectId(userId); // string을 ObjectId로 변환
    return this.notificationService.markNotificationsAsRead(objectId);
  }

  @Delete(':notificationId')
  deleteNotification(@Param('notificationId') notificationId: string) {
    const objectId = new Types.ObjectId(notificationId); // string을 ObjectId로 변환
    return this.notificationService.deleteNotification(objectId);
  }
}
