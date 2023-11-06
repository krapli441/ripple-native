import { Controller, UseGuards, Get, Query, Req, Post } from '@nestjs/common';
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
  async searchMusic(
    @Query('query') query: string,
    @Req() req: RequestWithUser,
  ) {
    const { _id } = req.user;
    console.log('req.user 값', req.user);
    console.log('userId 값 : ', _id);
    return this.searchService.searchMusicForUser(_id, query);
  }
}
