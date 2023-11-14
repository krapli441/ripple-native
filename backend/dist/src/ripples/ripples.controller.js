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
exports.RipplesController = void 0;
const common_1 = require("@nestjs/common");
const create_ripple_dto_1 = require("./create-ripple.dto");
const update_ripple_dto_1 = require("./update-ripple.dto");
const ripples_service_1 = require("./ripples.service");
let RipplesController = class RipplesController {
    constructor(ripplesService) {
        this.ripplesService = ripplesService;
    }
    create(createRippleDto) {
        return this.ripplesService.create(createRippleDto);
    }
    async findNearby(longitude, latitude, maxDistance) {
        return this.ripplesService.findNearbyRipples(longitude, latitude, maxDistance);
    }
    findAll() {
        return this.ripplesService.findAll();
    }
    findOne(id) {
        return this.ripplesService.findOne(id);
    }
    update(id, updateRippleDto) {
        return this.ripplesService.update(id, updateRippleDto);
    }
    remove(id) {
        return this.ripplesService.remove(id);
    }
    updateLike(id, userId) {
        return this.ripplesService.updateLike(id, userId);
    }
    findMyRipples(userId) {
        return this.ripplesService.findMyRipples(userId);
    }
    async findLikedRipples(userId) {
        return this.ripplesService.findLikedRipplesByUser(userId);
    }
};
exports.RipplesController = RipplesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ripple_dto_1.CreateRippleDto]),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/nearby'),
    __param(0, (0, common_1.Query)('longitude')),
    __param(1, (0, common_1.Query)('latitude')),
    __param(2, (0, common_1.Query)('maxDistance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], RipplesController.prototype, "findNearby", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ripple_dto_1.UpdateRippleDto]),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "updateLike", null);
__decorate([
    (0, common_1.Get)('my-ripples/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RipplesController.prototype, "findMyRipples", null);
__decorate([
    (0, common_1.Get)('liked-ripples/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RipplesController.prototype, "findLikedRipples", null);
exports.RipplesController = RipplesController = __decorate([
    (0, common_1.Controller)('ripples'),
    __metadata("design:paramtypes", [ripples_service_1.RipplesService])
], RipplesController);
//# sourceMappingURL=ripples.controller.js.map