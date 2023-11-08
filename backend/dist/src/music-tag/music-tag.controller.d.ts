import { TagService } from './music-tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    getRandomTags(): Promise<import("./tag.schema").Tag[]>;
    getAllTags(): Promise<import("./tag.schema").Tag[]>;
}
