import * as mongoose from 'mongoose';

export interface Tag extends Document {
  name: string;
  // 추가 필드가 있다면 여기에 정의
}

export const TagSchema = new mongoose.Schema({
  name: String,
});
