import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  recipientId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ripple', required: true })
  referenceId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  albumCoverUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  read: boolean;
}

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
  read: boolean; // 여기서 'Boolean'을 'boolean'으로 변경
}
