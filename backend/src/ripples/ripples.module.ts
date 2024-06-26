import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RipplesService } from './ripples.service';
import { RipplesController } from './ripples.controller';
import { Ripple, RippleSchema } from './ripples.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from '../user/user.module'; // UserModule 가져오기
import { FcmService } from '../fcm/fcm.service'; // FcmService 가져오기
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';
import {
  Notification,
  NotificationSchema,
} from '../notification/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ripple.name, schema: RippleSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    forwardRef(() => UserModule),
    NotificationModule,
  ],
  controllers: [RipplesController],
  providers: [RipplesService, FcmService, NotificationService],
  exports: [RipplesService],
})
export class RipplesModule {}
