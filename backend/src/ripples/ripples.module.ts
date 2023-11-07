import { Module } from '@nestjs/common';
import { RipplesController } from './ripples.controller';
import { RipplesService } from './ripples.service';

@Module({
  controllers: [RipplesController],
  providers: [RipplesService]
})
export class RipplesModule {}
