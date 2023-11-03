import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
export declare class SpotifyAuthController {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    getToken(body: {
        code: string;
        codeVerifier: string;
    }): Promise<import("../user/user.schema").User>;
}
