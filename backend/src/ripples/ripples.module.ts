import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RipplesService } from './ripples.service';
import { RipplesController } from './ripples.controller';
import { Ripple, RippleSchema } from './ripples.schema';
import { UserModule } from '../user/user.module'; // UserModule 가져오기
import { FcmService } from '../fcm/fcm.service'; // FcmService 가져오기

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ripple.name, schema: RippleSchema }]),
    UserModule, // UserModule 추가
  ],
  controllers: [RipplesController],
  providers: [RipplesService, FcmService],
})
export class RipplesModule {}
