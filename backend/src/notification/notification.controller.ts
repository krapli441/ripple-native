import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // 특정 사용자의 알림을 조회
  @Get(':userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(userId);
  }

  @Get('unread/count/:userId')
  getUnreadNotificationCount(@Param('userId') userId: string) {
    return this.notificationService.getUnreadNotificationCount(userId);
  }
}
