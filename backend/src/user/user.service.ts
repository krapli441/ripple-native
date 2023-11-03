// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: any): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  // 다른 CRUD 메서드
}
