import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare class Notification extends Document {
    recipientId: mongoose.Schema.Types.ObjectId;
    senderId: string;
    type: string;
    message: string;
    referenceId: mongoose.Schema.Types.ObjectId;
    albumCoverUrl: string;
    createdAt: Date;
    read: boolean;
}
export declare const NotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    recipientId: mongoose.Types.ObjectId;
    type: string;
    senderId: string;
    message: string;
    referenceId: mongoose.Types.ObjectId;
    albumCoverUrl: string;
    createdAt: Date;
    read: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    recipientId: mongoose.Types.ObjectId;
    type: string;
    senderId: string;
    message: string;
    referenceId: mongoose.Types.ObjectId;
    albumCoverUrl: string;
    createdAt: Date;
    read: boolean;
}>> & mongoose.FlatRecord<{
    recipientId: mongoose.Types.ObjectId;
    type: string;
    senderId: string;
    message: string;
    referenceId: mongoose.Types.ObjectId;
    albumCoverUrl: string;
    createdAt: Date;
    read: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Notification extends mongoose.Document {
    recipientId: mongoose.Schema.Types.ObjectId;
    senderId: string;
    type: string;
    message: string;
    referenceId: mongoose.Schema.Types.ObjectId;
    albumCoverUrl: string;
    createdAt: Date;
    read: boolean;
}
