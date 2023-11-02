import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private configService;
    constructor(configService: ConfigService);
    spotifyAuth(): Promise<void>;
    spotifyAuthCallback(req: any): Promise<any>;
    getSpotifyAuthUrl(res: any): any;
}
