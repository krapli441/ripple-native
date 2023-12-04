import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getUserNotifications(userId: string): Promise<import("./notification.schema").Notification[]>;
    getUnreadNotificationCount(userId: string): Promise<number>;
    markNotificationsAsRead(userId: string): Promise<void>;
    deleteNotification(notificationId: string): Promise<any>;
}
