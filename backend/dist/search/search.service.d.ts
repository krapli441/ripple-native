import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
export declare class SearchService {
    private userService;
    private httpService;
    constructor(userService: UserService, httpService: HttpService);
    searchMusicForUser(userId: string, query: string): Promise<any>;
}
