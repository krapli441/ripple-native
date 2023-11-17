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
        const newRipple = new this.rippleModel(createRippleDto);
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
        const ripples = await this.rippleModel
            .find({
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
        return Promise.resolve(ripples.map((ripple) => ripple.toObject({ versionKey: false })));
    }
    async findMyRipples(userId) {
        return this.rippleModel.find({ userId: userId }).exec();
    }
    async findLikedRipplesByUser(userId) {
        return this.rippleModel.find({ likedUsers: userId }).exec();
    }
    async updateLike(id, userId) {
        const ripple = await this.rippleModel.findById(id).exec();
        if (!ripple) {
            console.log(`Ripple not found with ID: ${id}`);
            throw new common_1.NotFoundException('Ripple not found');
        }
        console.log('Before updating likedUsers:', ripple.likedUsers);
        const index = ripple.likedUsers.indexOf(userId);
        if (index === -1) {
            ripple.likedUsers.push(userId);
            console.log('After updating likedUsers:', ripple.likedUsers);
            if (ripple.userId === userId) {
                const creator = await this.userService.findByUsername(ripple.userId);
                if (creator && creator.pushToken) {
                    console.log('Sending push notification to:', creator);
                    this.fcmService.sendNotification(creator.pushToken, 'Ripple', `${userId}님이 회원님이 남긴 음악을 좋아합니다.`);
                    const notificationData = {
                        recipientId: creator._id,
                        senderId: userId,
                        type: 'like',
                        message: `${userId}님이 회원님이 남긴 음악을 좋아합니다.`,
                        referenceId: id,
                        albumCoverUrl: ripple.albumCoverUrl,
                    };
                    console.log('Notification Data:', notificationData);
                    await this.notificationService.createNotification(notificationData);
                }
            }
        }
        else {
            ripple.likedUsers.splice(index, 1);
            console.log('After removing like:', ripple.likedUsers);
        }
        return ripple.save();
    }
};
exports.RipplesService = RipplesService;
exports.RipplesService = RipplesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ripples_schema_1.Ripple.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        fcm_service_1.FcmService,
        notification_service_1.NotificationService])
], RipplesService);
//# sourceMappingURL=ripples.service.js.map