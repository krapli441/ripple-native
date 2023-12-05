import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  tokenExpiry: Date;

  @Prop()
  pushToken: string;

  @Prop({ default: false })
  tutorialReaded: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
