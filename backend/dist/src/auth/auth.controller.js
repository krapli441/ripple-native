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
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let SpotifyAuthController = class SpotifyAuthController {
    constructor(configService, userService, jwtService) {
        this.configService = configService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async getToken(body) {
        console.log('Received request body:', body);
        try {
            const { accessToken, expiresIn, refresh_token } = await this.getSpotifyAccessToken(body);
            const expiryDate = new Date(new Date().getTime() + 10 * 1000);
            const userProfile = await this.getSpotifyUserProfile(accessToken);
            console.log('User profile with refreshToken:', userProfile);
            let user = await this.userService.findByEmail(userProfile.email);
            if (user) {
                user = await this.userService.update(user._id, {
                    accessToken: accessToken,
                    refreshToken: refresh_token,
                    tokenExpiry: expiryDate,
                });
                console.log('Updated User with refreshToken:', user);
            }
            else {
                user = await this.userService.create({
                    username: userProfile.display_name,
                    email: userProfile.email,
                    accessToken: accessToken,
                    refreshToken: refresh_token,
                    tokenExpiry: expiryDate,
                });
                console.log('Created new User with refreshToken:', user);
            }
            const jwtPayload = { email: user.email, userId: user._id };
            const jwtToken = this.jwtService.sign(jwtPayload, { expiresIn: '10s' });
            return {
                user,
                jwtToken,
            };
        }
        catch (error) {
            console.error(error.response?.data);
            throw error;
        }
    }
    async getSpotifyAccessToken(body) {
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
        const tokenResponse = await axios_1.default.post('https://accounts.spotify.com/api/token', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log('Spotify Token Response:', tokenResponse.data);
        return {
            accessToken: tokenResponse.data.access_token,
            expiresIn: tokenResponse.data.expires_in,
            refresh_token: tokenResponse.data.refresh_token,
        };
    }
    async getSpotifyUserProfile(accessToken) {
        const userProfileResponse = await axios_1.default.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return userProfileResponse.data;
    }
    async refresh(body) {
        try {
            const { refreshToken, userId } = body;
            const { accessToken, jwtToken } = await this.refreshAccessToken(refreshToken, userId);
            return { accessToken, jwtToken };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to refresh token');
        }
    }
    async refreshAccessToken(refreshToken, userId) {
        const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
        const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        try {
            const tokenResponse = await axios_1.default.post('https://accounts.spotify.com/api/token', params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const newAccessToken = tokenResponse.data.access_token;
            const expiresIn = tokenResponse.data.expires_in;
            const expiryDate = new Date(new Date().getTime() + 10 * 1000);
            let user = await this.userService.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user = await this.userService.update(user._id, {
                accessToken: newAccessToken,
                tokenExpiry: expiryDate,
            });
            const jwtPayload = { email: user.email, userId: user._id };
            const jwtToken = this.jwtService.sign(jwtPayload, { expiresIn: '10s' });
            return { accessToken: newAccessToken, jwtToken };
        }
        catch (error) {
            console.error('Error refreshing access token:', error);
            throw new Error('Failed to refresh access token');
        }
    }
    async updatePushToken(body, req) {
        const userId = req.user.id;
        await this.userService.update(userId, { pushToken: body.pushToken });
        return { message: 'Push token updated' };
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
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpotifyAuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('push-token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SpotifyAuthController.prototype, "updatePushToken", null);
exports.SpotifyAuthController = SpotifyAuthController = __decorate([
    (0, common_1.Controller)('auth/spotify'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        jwt_1.JwtService])
], SpotifyAuthController);
//# sourceMappingURL=auth.controller.js.map