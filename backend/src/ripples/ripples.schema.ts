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

  @Prop({
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  })
  location: Location;

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
