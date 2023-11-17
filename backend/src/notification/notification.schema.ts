import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderId: { type: String, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ripple',
    required: true,
  },
  albumCoverUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

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
