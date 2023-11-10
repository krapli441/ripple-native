// ripple.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Location {
  type: string;
  coordinates: number[];
}

export interface IRipple extends Document {
  userId: string;
  title: string;
  artist: string;
  albumCoverUrl?: string;
  spotifyExternalUrl?: string;
  location: Location;
  tag?: string[];
  likes: number;
  createdAt: Date; // 이 줄을 추가
  expiresAt?: Date;
}

@Schema({ timestamps: true })
export class Ripple extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop()
  albumCoverUrl: string;

  @Prop()
  spotifyExternalUrl: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    _id: false,
  })
  location: Location;

  @Prop()
  tag: string[];

  @Prop({ default: 0 })
  likes: number; // 기본값으로 0을 설정

  @Prop()
  expiresAt: Date;
}

export const RippleSchema = SchemaFactory.createForClass(Ripple);
RippleSchema.index({ location: '2dsphere' });

RippleSchema.pre<IRipple>('save', function (next) {
  if (this.isNew) {
    this.expiresAt = new Date(this.createdAt.getTime() + 24 * 60 * 60 * 1000); // 24시간 뒤의 시간을 계산
  }
  next();
});
