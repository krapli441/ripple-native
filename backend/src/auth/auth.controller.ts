import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyAuth() {}

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyAuthCallback(@Request() req) {
    // 로그인에 성공한 후 원하는 경로로 리다이렉트하거나 정보를 반환.
    return req.user;
  }

  @Get('spotify-url')
  getSpotifyAuthUrl(@Res() res) {
    const spotifyAuthUrl =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      this.configService.get<string>('SPOTIFY_CLIENT_ID') +
      '&scope=user-read-email%20playlist-modify-public%20user-read-private' +
      '&redirect_uri=' +
      encodeURIComponent('http://192.168.0.215:3000/auth/spotify/callback');

    return res.json({ authUrl: spotifyAuthUrl });
  }

  @Post('validate-token')
  async validateToken(@Body() body, @Res() res) {
    try {
      const { accessToken } = body;

      const spotifyUser = await this.authService.validateSpotifyToken(
        accessToken,
      );

      if (spotifyUser) {
        const jwt = this.authService.createJwt(spotifyUser); // JWT 생성 로직
        return res.json({ success: true, jwt });
      } else {
        return res.json({ success: false, error: 'Invalid token' });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  }
}
