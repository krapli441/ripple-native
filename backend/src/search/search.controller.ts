import { Controller, UseGuards, Get, Query, Req, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // 경로는 실제 경로로 변경해야 합니다.
import { SearchService } from './search.service';
import { Request } from 'express';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async searchMusic(@Query('query') query: string, @Req() req: Request) {
    // JwtAuthGuard를 통과하면, req 객체에 사용자 정보가 포함된다.
    const userId = req.body; // 사용자 ID를 가져옴
    try {
      const results = await this.searchService.searchMusicForUser(
        userId,
        query,
      );
      return results;
    } catch (error) {
      // 적절한 예외 처리
      throw new Error(error.message);
    }
  }
}
