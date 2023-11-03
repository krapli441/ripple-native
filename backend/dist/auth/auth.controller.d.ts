import { ConfigService } from '@nestjs/config';
export declare class SpotifyAuthController {
    private configService;
    constructor(configService: ConfigService);
    getToken(code: string): Promise<any>;
}
