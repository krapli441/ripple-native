// user.service.ts
import {
  ConflictException,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { RipplesService } from 'src/ripples/ripples.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => RipplesService))
    private rippleService: RipplesService,
  ) {}

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

  async completeTutorial(userId: string): Promise<User> {
    console.log(`Updating tutorialReaded to true for user: ${userId}`);

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { tutorialReaded: true }, { new: true })
      .exec();

    console.log('User updated with tutorialReaded:', updatedUser);
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    // 사용자 정보 삭제
    await this.userModel.findByIdAndRemove(userId).exec();

    // 사용자가 생성한 음악 마커 삭제
    await this.rippleService.deleteRipplesByUser(userId);

    // 사용자가 좋아요한 음악 마커에서 사용자 제거
    await this.rippleService.removeLikesByUser(userId);
  }

  // 다른 CRUD 메서드
}
