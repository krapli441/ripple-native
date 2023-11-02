import { ConfigService } from '@nestjs/config';
declare const SpotifyOAuth2Strategy_base: new (...args: any[]) => any;
export declare class SpotifyOAuth2Strategy extends SpotifyOAuth2Strategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: any, req: any): Promise<any>;
}
export {};
