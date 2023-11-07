import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RipplesService } from './ripples.service';
import { RipplesController } from './ripples.controller';
import { Ripple, RippleSchema } from './ripples.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ripple.name, schema: RippleSchema }]),
  ],
  controllers: [RipplesController],
  providers: [RipplesService],
})
export class RipplesModule {}
