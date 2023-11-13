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
let RipplesService = class RipplesService {
    constructor(rippleModel) {
        this.rippleModel = rippleModel;
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
    async updateLike(id, userId) {
        const ripple = await this.rippleModel.findById(id).exec();
        if (!ripple) {
            throw new common_1.NotFoundException('Ripple not found');
        }
        const index = ripple.likedUsers.indexOf(userId);
        if (index === -1) {
            ripple.likedUsers.push(userId);
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
    __metadata("design:paramtypes", [mongoose_2.Model])
], RipplesService);
//# sourceMappingURL=ripples.service.js.map