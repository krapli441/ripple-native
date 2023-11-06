import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';
import { SearchController } from './search.controller';

@Module({
  imports: [UserModule, HttpModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
