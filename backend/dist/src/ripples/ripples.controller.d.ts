import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { RipplesService } from './ripples.service';
export declare class RipplesController {
    private readonly ripplesService;
    constructor(ripplesService: RipplesService);
    create(createRippleDto: CreateRippleDto): Promise<import("./ripples.schema").Ripple>;
    findNearby(longitude: number, latitude: number, maxDistance: number): Promise<import("./ripples.schema").IRipple[]>;
    findAll(): Promise<import("./ripples.schema").Ripple[]>;
    findOne(id: string): Promise<import("./ripples.schema").Ripple>;
    update(id: string, updateRippleDto: UpdateRippleDto): Promise<import("./ripples.schema").Ripple>;
    remove(id: string): Promise<import("./ripples.schema").Ripple>;
    updateLike(id: string, userId: string): Promise<import("./ripples.schema").Ripple>;
    findMyRipples(userId: string): Promise<import("./ripples.schema").Ripple[]>;
    findLikedRipples(userId: string): Promise<import("./ripples.schema").Ripple[]>;
}
