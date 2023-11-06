import { SearchService } from './search.service';
import { Request } from 'express';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchMusic(query: string, req: Request): Promise<any>;
}
