import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class SearchService {
    private userService;
    private httpService;
    private configService;
    constructor(userService: UserService, httpService: HttpService, configService: ConfigService);
    searchMusicForUser(userId: string, query: string): Promise<any>;
    private refreshAccessToken;
}
