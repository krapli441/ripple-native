import { Model } from 'mongoose';
import { Notification } from './notification.schema';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<Notification>);
    createNotification(data: any): Promise<Notification>;
    getUserNotifications(userId: string): Promise<Notification[]>;
    getUnreadNotificationCount(userId: string): Promise<number>;
    markNotificationsAsRead(userId: string): Promise<void>;
}
