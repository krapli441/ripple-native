import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CodeVerifier } from './code-verifier.schema';
declare const SpotifyOAuth2Strategy_base: new (...args: any[]) => any;
export declare class SpotifyOAuth2Strategy extends SpotifyOAuth2Strategy_base {
    private configService;
    private codeVerifierModel;
    constructor(configService: ConfigService, codeVerifierModel: Model<CodeVerifier>);
    validate(accessToken: string, refreshToken: string, profile: any, req: any): Promise<any>;
}
export {};
