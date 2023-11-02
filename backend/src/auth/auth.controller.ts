import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyAuth() {}

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyAuthCallback(@Request() req) {
    // 로그인에 성공한 후 원하는 경로로 리다이렉트하거나 정보를 반환.
    return req.user;
  }
}
