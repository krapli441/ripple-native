// ripple.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ripple extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop()
  albumCoverUrl: string;

  @Prop()
  spotifyExternalUrl: string;

  @Prop()
  location: string; // 마커 생성 좌표를 타입에 맞게 수정해야 함

  @Prop()
  tag: string[];

  @Prop()
  likes: number;

  @Prop()
  createdAt: Date;

  @Prop()
  expiresAt: Date;
}

export const RippleSchema = SchemaFactory.createForClass(Ripple);
