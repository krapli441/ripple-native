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
exports.SpotifyAuthController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let SpotifyAuthController = class SpotifyAuthController {
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    async getToken(body) {
        const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
        const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');
        const redirectUri = 'com.ripple:/oauth';
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', body.code);
        params.append('redirect_uri', redirectUri);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('code_verifier', body.codeVerifier);
        try {
            const tokenResponse = await axios_1.default.post('https://accounts.spotify.com/api/token', params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const accessToken = tokenResponse.data.access_token;
            const userProfileResponse = await axios_1.default.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userProfile = userProfileResponse.data;
            console.log('getUserProfile:', userProfile);
            const user = await this.userService.create({
                username: userProfile.display_name,
                email: userProfile.email,
                accessToken: tokenResponse.data.access_token,
                refreshToken: tokenResponse.data.refresh_token,
            });
            return user;
        }
        catch (error) {
            console.error(error.response?.data);
            throw error;
        }
    }
};
exports.SpotifyAuthController = SpotifyAuthController;
__decorate([
    (0, common_1.Post)('token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpotifyAuthController.prototype, "getToken", null);
exports.SpotifyAuthController = SpotifyAuthController = __decorate([
    (0, common_1.Controller)('auth/spotify'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], SpotifyAuthController);
//# sourceMappingURL=auth.controller.js.map