"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth/auth.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const search_controller_1 = require("./search/search.controller");
const search_service_1 = require("./search/search.service");
const axios_1 = require("@nestjs/axios");
const ripples_module_1 = require("./ripples/ripples.module");
const music_tag_controller_1 = require("./music-tag/music-tag.controller");
const music_tag_module_1 = require("./music-tag/music-tag.module");
const fcm_service_1 = require("./fcm/fcm.service");
const notification_schema_1 = require("./notification/notification.schema");
const notification_service_1 = require("./notification/notification.service");
const notification_controller_1 = require("./notification/notification.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'spotify' }),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/ripple'),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Notification', schema: notification_schema_1.NotificationSchema },
            ]),
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION') || '1h',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            axios_1.HttpModule,
            ripples_module_1.RipplesModule,
            music_tag_module_1.TagModule,
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.SpotifyAuthController,
            search_controller_1.SearchController,
            music_tag_controller_1.TagController,
            notification_controller_1.NotificationController,
        ],
        providers: [app_service_1.AppService, search_service_1.SearchService, fcm_service_1.FcmService, notification_service_1.NotificationService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map