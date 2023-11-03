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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyOAuth2Strategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_oauth2_1 = require("passport-oauth2");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let SpotifyOAuth2Strategy = class SpotifyOAuth2Strategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'spotify-oauth2') {
    constructor(configService, codeVerifierModel) {
        super({
            authorizationURL: 'https://accounts.spotify.com/authorize',
            tokenURL: 'https://accounts.spotify.com/api/token',
            clientID: configService.get('SPOTIFY_CLIENT_ID'),
            clientSecret: configService.get('SPOTIFY_CLIENT_SECRET'),
            callbackURL: 'http://192.168.0.215:3000/auth/spotify/callback',
            scope: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
            passReqToCallback: true,
            state: true,
        });
        this.configService = configService;
        this.codeVerifierModel = codeVerifierModel;
    }
    async validate(accessToken, refreshToken, profile, req) {
        console.log('AccessToken:', accessToken);
        console.log('RefreshToken:', refreshToken);
        console.log('Profile:', profile);
        return profile;
    }
};
exports.SpotifyOAuth2Strategy = SpotifyOAuth2Strategy;
exports.SpotifyOAuth2Strategy = SpotifyOAuth2Strategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('CodeVerifier')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_1.Model])
], SpotifyOAuth2Strategy);
//# sourceMappingURL=spotify-oauth2.strategy.js.map