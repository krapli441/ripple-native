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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
let SearchService = class SearchService {
    constructor(userService, httpService, configService) {
        this.userService = userService;
        this.httpService = httpService;
        this.configService = configService;
    }
    async searchMusicForUser(userId, query) {
        let user = await this.userService.findByUsername(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (new Date() > new Date(user.tokenExpiry)) {
            user = await this.refreshAccessToken(user);
        }
        const response = await this.httpService
            .get(`https://api.spotify.com/v1/search`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
            params: { q: query, type: 'track' },
        })
            .toPromise();
        return response.data.tracks.items;
    }
    async refreshAccessToken(user) {
        const refreshToken = user.refreshToken;
        const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
        const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const response = await this.httpService
            .post('https://accounts.spotify.com/api/token', params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .toPromise();
        const data = response.data;
        const newExpiryDate = new Date(new Date().getTime() + data.expires_in * 1000);
        await this.userService.update(user.id, {
            accessToken: data.access_token,
            refreshToken: data.refresh_token || refreshToken,
            tokenExpiry: newExpiryDate,
        });
        return this.userService.findByUsername(user.id);
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        axios_1.HttpService,
        config_1.ConfigService])
], SearchService);
//# sourceMappingURL=search.service.js.map