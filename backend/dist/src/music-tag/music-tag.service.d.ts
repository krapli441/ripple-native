import { Model } from 'mongoose';
import { Tag } from './tag.schema';
export declare class TagService {
    private tagModel;
    constructor(tagModel: Model<Tag>);
    getRandomTags(): Promise<Tag[]>;
    seedTags(tags: any[]): Promise<void>;
}
