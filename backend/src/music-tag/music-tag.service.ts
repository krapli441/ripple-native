import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private tagModel: Model<Tag>) {}
  async getRandomTags(): Promise<Tag[]> {
    // MongoDB의 $sample 연산자를 사용하여 무작위로 태그를 선택
    return this.tagModel.aggregate([{ $sample: { size: 5 } }]).exec();
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async seedTags(tags: any[]): Promise<void> {
    await this.tagModel.insertMany(tags);
  }
}
