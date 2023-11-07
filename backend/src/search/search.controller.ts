import {
  Controller,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchService } from './search.service';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    _id: string;
  };
}

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async searchMusic(@Body('query') query: string, @Req() req: RequestWithUser) {
    const { _id } = req.user;
    return this.searchService.searchMusicForUser(_id, query);
  }
}
