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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const ripples_service_1 = require("../ripples/ripples.service");
let UserService = class UserService {
    constructor(userModel, rippleService) {
        this.userModel = userModel;
        this.rippleService = rippleService;
    }
    async create(userData) {
        console.log('Creating user with refreshToken:', userData.refreshToken);
        const user = new this.userModel(userData);
        return user.save();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email: email }).exec();
    }
    async update(id, updateData) {
        return this.userModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
    }
    async findById(userId) {
        return this.userModel.findById(userId).exec();
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username: username }).exec();
    }
    async deleteUser(userId) {
        await this.userModel.findByIdAndRemove(userId).exec();
        await this.rippleService.deleteRipplesByUser(userId);
        await this.rippleService.removeLikesByUser(userId);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => ripples_service_1.RipplesService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        ripples_service_1.RipplesService])
], UserService);
//# sourceMappingURL=user.service.js.map