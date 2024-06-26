"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RipplesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ripples_service_1 = require("./ripples.service");
const ripples_controller_1 = require("./ripples.controller");
const ripples_schema_1 = require("./ripples.schema");
const user_module_1 = require("../user/user.module");
const fcm_service_1 = require("../fcm/fcm.service");
const notification_service_1 = require("../notification/notification.service");
const notification_module_1 = require("../notification/notification.module");
const notification_schema_1 = require("../notification/notification.schema");
let RipplesModule = class RipplesModule {
};
exports.RipplesModule = RipplesModule;
exports.RipplesModule = RipplesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: ripples_schema_1.Ripple.name, schema: ripples_schema_1.RippleSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            notification_module_1.NotificationModule,
        ],
        controllers: [ripples_controller_1.RipplesController],
        providers: [ripples_service_1.RipplesService, fcm_service_1.FcmService, notification_service_1.NotificationService],
        exports: [ripples_service_1.RipplesService],
    })
], RipplesModule);
//# sourceMappingURL=ripples.module.js.map