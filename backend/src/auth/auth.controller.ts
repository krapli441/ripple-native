import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SpotifyStrategy } from './spotify-strategy/spotify-strategy.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly spotifyStrategy: SpotifyStrategy) {}
  @Get('spotify')
  spotifyLogin() {
    return {
      authorizeUrl: this.spotifyStrategy.getAuthorizeUrl(),
    };
  }

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  spotifyLoginCallback(@Req() req) {
    // 스포티파이 인증 후 리다이렉트되는 핸들러
    return req.user;
  }
}
