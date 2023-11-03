import { SpotifyStrategy } from './spotify-strategy/spotify-strategy.service';
export declare class AuthController {
    private readonly spotifyStrategy;
    constructor(spotifyStrategy: SpotifyStrategy);
    spotifyLogin(): {
        authorizeUrl: string;
    };
    spotifyLoginCallback(req: any): any;
}
