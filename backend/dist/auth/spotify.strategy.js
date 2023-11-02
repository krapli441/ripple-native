"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SpotifyStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_oauth2_1 = require("passport-oauth2");
const config_1 = require("@nestjs/config");
let SpotifyStrategy = SpotifyStrategy_1 = class SpotifyStrategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'spotify') {
    constructor(configService) {
        super({
            authorizationURL: 'https://accounts.spotify.com/authorize',
            tokenURL: 'https://accounts.spotify.com/api/token',
            clientID: configService.get('SPOTIFY_CLIENT_ID'),
            clientSecret: configService.get('SPOTIFY_CLIENT_SECRET'),
            callbackURL: 'http://192.168.0.215:3000/auth/spotify/callback',
            scope: ['user-read-email', 'user-read-private'],
            state: true,
            pkce: true,
        });
        this.configService = configService;
        this.logger = new common_1.Logger(SpotifyStrategy_1.name);
        this.logger.log('SpotifyStrategy initialized');
    }
    async validate(accessToken, refreshToken, profile) {
        this.logger.log('Entering SpotifyStrategy validate');
        console.log('SpotifyStrategy validate', profile);
        this.logger.log(`Access Token: ${accessToken}`);
        this.logger.log(`Refresh Token: ${refreshToken}`);
        this.logger.log('Profile returned:', profile);
        return profile;
    }
};
exports.SpotifyStrategy = SpotifyStrategy;
exports.SpotifyStrategy = SpotifyStrategy = SpotifyStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SpotifyStrategy);
//# sourceMappingURL=spotify.strategy.js.map