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
exports.RipplesService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ripples_schema_1 = require("./ripples.schema");
const user_service_1 = require("../user/user.service");
const fcm_service_1 = require("../fcm/fcm.service");
const notification_service_1 = require("../notification/notification.service");
let RipplesService = class RipplesService {
    constructor(rippleModel, userService, fcmService, notificationService) {
        this.rippleModel = rippleModel;
        this.userService = userService;
        this.fcmService = fcmService;
        this.notificationService = notificationService;
    }
    async create(createRippleDto) {
        const newRipple = new this.rippleModel({
            ...createRippleDto,
            isActive: true,
            expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });
        return newRipple.save();
    }
    async findAll() {
        return this.rippleModel.find().exec();
    }
    async findOne(id) {
        return this.rippleModel.findById(id).exec();
    }
    async update(id, updateRippleDto) {
        return this.rippleModel
            .findByIdAndUpdate(id, updateRippleDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.rippleModel.findByIdAndRemove(id).exec();
    }
    async findNearbyRipples(longitude, latitude, maxDistance) {
        const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const ripples = await this.rippleModel
            .find({
            createdAt: { $gte: twentyFourHoursAgo },
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: maxDistance,
                },
            },
        })
            .exec();
        return ripples.map((ripple) => ripple.toObject({ versionKey: false }));
    }
    async findMyRipples(userId) {
        return this.rippleModel.find({ userId: userId }).exec();
    }
    async findLikedRipplesByUser(userId) {
        return this.rippleModel.find({ likedUsers: userId }).exec();
    }
    async deleteRipplesByUser(userId) {
        await this.rippleModel.deleteMany({ userObjectId: userId }).exec();
    }
    async removeLikesByUser(userId) {
        await this.rippleModel
            .updateMany({ likedUsers: userId }, { $pull: { likedUsers: userId } })
            .exec();
    }
    async updateLike(id, userId) {
        console.log(`Received like for rippleId: ${id}, userId: ${userId}`);
        const ripple = await this.rippleModel.findById(id).exec();
        console.log('찾아낸 ripple 아이디 : ', ripple);
        if (!ripple) {
            throw new common_1.NotFoundException('Ripple not found');
        }
        const index = ripple.likedUsers.indexOf(userId);
        if (index === -1) {
            ripple.likedUsers.push(userId);
            await this.notificationService.createNotification({
                recipientId: ripple.userObjectId,
                senderId: userId,
                type: 'like',
                message: `${userId}님이 회원님이 남긴 음악을 좋아합니다.`,
                referenceId: id,
                albumCoverUrl: ripple.albumCoverUrl,
            });
            const creator = await this.userService.findByUsername(ripple.userId);
            if (creator && creator.pushToken) {
                this.fcmService.sendNotification(creator.pushToken, 'Ripple', `${userId}님이 회원님이 남긴 음악을 좋아합니다.`);
            }
        }
        else {
            ripple.likedUsers.splice(index, 1);
        }
        return ripple.save();
    }
};
exports.RipplesService = RipplesService;
exports.RipplesService = RipplesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ripples_schema_1.Ripple.name)),
    __param(1, (0, common_2.Inject)((0, common_2.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        fcm_service_1.FcmService,
        notification_service_1.NotificationService])
], RipplesService);
//# sourceMappingURL=ripples.service.js.map