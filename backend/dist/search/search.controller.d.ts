import { SearchService } from './search.service';
import { Request } from 'express';
interface RequestWithUser extends Request {
    user: {
        _id: string;
    };
}
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchMusic(query: string, req: RequestWithUser): Promise<any>;
}
export {};
