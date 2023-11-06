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
const axios_1 = require("@nestjs/axios");
const user_service_1 = require("../user/user.service");
let SearchService = class SearchService {
    constructor(userService, httpService) {
        this.userService = userService;
        this.httpService = httpService;
    }
    async searchMusicForUser(userId, query) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        try {
            const response = await this.httpService
                .get(`https://api.spotify.com/v1/search`, {
                headers: { Authorization: `Bearer ${user.accessToken}` },
                params: { q: query, type: 'track' },
            })
                .toPromise();
            return response.data.tracks.items;
        }
        catch (error) {
            console.error('Error searching Spotify:', error);
            throw new Error('Error searching Spotify');
        }
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        axios_1.HttpService])
], SearchService);
//# sourceMappingURL=search.service.js.map