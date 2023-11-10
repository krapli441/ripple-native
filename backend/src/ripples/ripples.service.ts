import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { Ripple, IRipple } from './ripples.schema';

@Injectable()
export class RipplesService {
  constructor(@InjectModel(Ripple.name) private rippleModel: Model<Ripple>) {}

  async create(createRippleDto: CreateRippleDto): Promise<Ripple> {
    const newRipple = new this.rippleModel(createRippleDto);
    return newRipple.save();
  }

  async findAll(): Promise<Ripple[]> {
    return this.rippleModel.find().exec();
  }

  async findOne(id: string): Promise<Ripple> {
    return this.rippleModel.findById(id).exec();
  }

  async update(id: string, updateRippleDto: UpdateRippleDto): Promise<Ripple> {
    return this.rippleModel
      .findByIdAndUpdate(id, updateRippleDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Ripple> {
    return this.rippleModel.findByIdAndRemove(id).exec();
  }

  async findNearbyRipples(
    longitude: number,
    latitude: number,
    maxDistance: number,
  ): Promise<IRipple[]> {
    const ripples = await this.rippleModel
      .find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        },
      })
      .exec();
    return Promise.resolve(
      ripples.map((ripple) =>
        ripple.toObject({ versionKey: false }),
      ) as IRipple[],
    );
  }
}
