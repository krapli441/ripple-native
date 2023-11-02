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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
let AuthController = AuthController_1 = class AuthController {
    constructor(configService, authService) {
        this.configService = configService;
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async spotifyAuth() { }
    async spotifyAuthCallback(req) {
        this.logger.log('Spotify callback endpoint hit');
        return req.user;
    }
    getSpotifyAuthUrl(res) {
        const spotifyAuthUrl = 'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            this.configService.get('SPOTIFY_CLIENT_ID') +
            '&scope=user-read-email%20playlist-modify-public%20user-read-private' +
            '&redirect_uri=' +
            encodeURIComponent('http://192.168.0.215:3000/auth/spotify/callback');
        return res.json({ authUrl: spotifyAuthUrl });
    }
    async validateToken(body, res) {
        console.log('Received AccessToken:', body.accessToken);
        try {
            const { accessToken } = body;
            const spotifyUser = await this.authService.validateSpotifyToken(accessToken);
            if (spotifyUser) {
                const jwt = this.authService.createJwt(spotifyUser);
                console.log('JWT 발급 : ', jwt);
                return res.json({ success: true, jwt });
            }
            else {
                return res.json({ success: false, error: 'Invalid token' });
            }
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, error: 'Internal Server Error' });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('spotify'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('spotify-oauth2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "spotifyAuth", null);
__decorate([
    (0, common_1.Get)('spotify/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('spotify-oauth2')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "spotifyAuthCallback", null);
__decorate([
    (0, common_1.Get)('spotify-url'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getSpotifyAuthUrl", null);
__decorate([
    (0, common_1.Post)('validate-token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map