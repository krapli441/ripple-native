import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
export declare class AuthController {
    private configService;
    private authService;
    private readonly logger;
    constructor(configService: ConfigService, authService: AuthService);
    spotifyAuth(): Promise<void>;
    spotifyCallback(req: any, res: any): Promise<void>;
    getSpotifyAuthUrl(res: any): any;
    validateToken(body: any, res: any): Promise<any>;
}
