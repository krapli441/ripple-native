import { ConfigService } from '@nestjs/config';
export declare class SpotifyAuthController {
    private configService;
    constructor(configService: ConfigService);
    getToken(body: {
        code: string;
        codeVerifier: string;
    }): Promise<{
        tokenData: any;
        userProfile: any;
    }>;
}
