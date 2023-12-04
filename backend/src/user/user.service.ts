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
    console.log('Creating user with refreshToken:', userData.refreshToken);
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

  // 사용자 ID로 사용자를 찾는 메서드
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  // 사용자 이름으로 사용자를 찾는 메서드
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async delete(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
    // 여기서 연관된 다른 데이터도 삭제하는 로직을 추가할 수 있습니다.
  }

  // 다른 CRUD 메서드
}
