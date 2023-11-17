import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getUserNotifications(userId: string): Promise<import("./notification.schema").Notification[]>;
}
