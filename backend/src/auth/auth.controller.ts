import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  spotifyLogin() {
    // 리다이렉트되기 전에 실행될 핸들러
  }

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  spotifyLoginCallback(@Req() req) {
    // 스포티파이 인증 후 리다이렉트되는 핸들러
    return req.user;
  }
}
