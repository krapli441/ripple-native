import { Controller, UseGuards, Get, Query, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchService } from './search.service';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    userId: string;
  };
}

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async searchMusic(
    @Query('query') query: string,
    @Req() req: RequestWithUser,
  ) {
    const { userId } = req.user;
    return this.searchService.searchMusicForUser(userId, query);
  }
}
