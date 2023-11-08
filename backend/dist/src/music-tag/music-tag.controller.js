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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const music_tag_service_1 = require("./music-tag.service");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async getRandomTags() {
        return this.tagService.getRandomTags();
    }
    getAllTags() {
        return this.tagService.getAllTags();
    }
};
exports.TagController = TagController;
__decorate([
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getRandomTags", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TagController.prototype, "getAllTags", null);
exports.TagController = TagController = __decorate([
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [music_tag_service_1.TagService])
], TagController);
//# sourceMappingURL=music-tag.controller.js.map