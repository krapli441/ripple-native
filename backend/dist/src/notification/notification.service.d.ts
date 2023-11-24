import mongoose, { Model } from 'mongoose';
import { Notification } from './notification.schema';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<Notification>);
    createNotification(data: any): Promise<Notification>;
    getUserNotifications(userObjectId: mongoose.Types.ObjectId): Promise<Notification[]>;
    getUnreadNotificationCount(userObjectId: mongoose.Types.ObjectId): Promise<number>;
    markNotificationsAsRead(userObjectId: mongoose.Types.ObjectId): Promise<void>;
}
