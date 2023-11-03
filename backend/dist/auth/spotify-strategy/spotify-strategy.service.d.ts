import { ConfigService } from '@nestjs/config';
declare const SpotifyStrategy_base: new (...args: any[]) => any;
export declare class SpotifyStrategy extends SpotifyStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
    getAuthorizeUrl(): string;
}
export {};
