import { Model } from 'mongoose';
import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { Ripple, IRipple } from './ripples.schema';
export declare class RipplesService {
    private rippleModel;
    constructor(rippleModel: Model<Ripple>);
    create(createRippleDto: CreateRippleDto): Promise<Ripple>;
    findAll(): Promise<Ripple[]>;
    findOne(id: string): Promise<Ripple>;
    update(id: string, updateRippleDto: UpdateRippleDto): Promise<Ripple>;
    remove(id: string): Promise<Ripple>;
    findNearbyRipples(longitude: number, latitude: number, maxDistance: number): Promise<IRipple[]>;
    findMyRipples(userId: string): Promise<Ripple[]>;
    findLikedRipplesByUser(userId: string): Promise<Ripple[]>;
    updateLike(id: string, userId: string): Promise<Ripple>;
}
