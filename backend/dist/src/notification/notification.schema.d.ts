import * as mongoose from 'mongoose';
export declare const NotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    albumCoverUrl: string;
    createdAt: Date;
    recipientId: mongoose.Types.ObjectId;
    senderId: string;
    message: string;
    referenceId: mongoose.Types.ObjectId;
    read: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    albumCoverUrl: string;
    createdAt: Date;
    recipientId: mongoose.Types.ObjectId;
    senderId: string;
    message: string;
    referenceId: mongoose.Types.ObjectId;
    read: boolean;
}>> & mongoose.FlatRecord<{
    type: string;
    albumCoverUrl: string;
    createdAt: Date;
    recipientId: mongoose.Types.ObjectId;
    senderId: string;
    message: string;
    referenceId: mongoose.Types.ObjectId;
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
    read: Boolean;
}
