import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class SpotifyAuthController {
    private configService;
    private userService;
    private jwtService;
    constructor(configService: ConfigService, userService: UserService, jwtService: JwtService);
    getToken(body: {
        code: string;
        codeVerifier: string;
    }): Promise<{
        user: import("../user/user.schema").User;
        jwtToken: string;
    }>;
    private getSpotifyAccessToken;
    private getSpotifyUserProfile;
}
