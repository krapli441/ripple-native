import { Model } from 'mongoose';
import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { Ripple } from './ripples.schema';
export declare class RipplesService {
    private rippleModel;
    constructor(rippleModel: Model<Ripple>);
    create(createRippleDto: CreateRippleDto): Promise<Ripple>;
    findAll(): Promise<Ripple[]>;
    findOne(id: string): Promise<Ripple>;
    update(id: string, updateRippleDto: UpdateRippleDto): Promise<Ripple>;
    remove(id: string): Promise<Ripple>;
}
