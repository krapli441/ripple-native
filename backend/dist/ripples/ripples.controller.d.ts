import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { RipplesService } from './ripples.service';
export declare class RipplesController {
    private readonly ripplesService;
    constructor(ripplesService: RipplesService);
    create(createRippleDto: CreateRippleDto): Promise<import("./ripples.schema").Ripple>;
    findAll(): Promise<import("./ripples.schema").Ripple[]>;
    findOne(id: string): Promise<import("./ripples.schema").Ripple>;
    update(id: string, updateRippleDto: UpdateRippleDto): Promise<import("./ripples.schema").Ripple>;
    remove(id: string): Promise<import("./ripples.schema").Ripple>;
}
