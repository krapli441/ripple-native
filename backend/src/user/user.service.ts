// user.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: CreateUserDto): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async update(id: string, updateData: Partial<CreateUserDto>): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // 다른 CRUD 메서드
}
