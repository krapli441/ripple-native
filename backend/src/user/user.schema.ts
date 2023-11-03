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

  // 다른 필드들을 추가할 수 있음
}

export const UserSchema = SchemaFactory.createForClass(User);
