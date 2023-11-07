// ripple.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Location {
  latitude: number;
  longitude: number;
}

@Schema()
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
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  })
  location: Location;

  @Prop()
  tag: string[];

  @Prop({ default: 0 })
  likes: number; // 기본값으로 0을 설정

  @Prop()
  createdAt: Date;

  @Prop()
  expiresAt: Date;
}

export const RippleSchema = SchemaFactory.createForClass(Ripple);

RippleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.expiresAt = new Date(this.createdAt.getTime() + 24 * 60 * 60 * 1000); // 24시간 뒤의 시간을 계산
  }
  next();
});
