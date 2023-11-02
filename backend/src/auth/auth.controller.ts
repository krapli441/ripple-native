import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get('spotify')
  @UseGuards(AuthGuard('spotify-oauth2'))
  async spotifyAuth() {}

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify-oauth2'))
  async spotifyCallback(@Req() req, @Res() res) {
    const code = req.query.code;

    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: {
        code: code,
        redirect_uri: 'http://192.168.0.215:3000/auth/spotify/callback',
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            this.configService.get<string>('SPOTIFY_CLIENT_ID') +
              ':' +
              this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
          ).toString('base64'),
      },
    };

    try {
      const response = await axios(authOptions);
      const accessToken = response.data.access_token;
      // 이제 액세스 토큰을 사용하여 필요한 작업을 수행할 수 있습니다.
      // 예: 사용자 정보 가져오기, 토큰 저장하기 등

      res.redirect('/some-endpoint'); // 성공적으로 토큰을 받은 후 리디렉션할 엔드포인트
    } catch (error) {
      console.error('Error fetching access token:', error.response.data);
      res.redirect('/error-endpoint'); // 에러 시 리디렉션할 엔드포인트
    }
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
    console.log('Received AccessToken:', body.accessToken);
    try {
      const { accessToken } = body;

      const spotifyUser = await this.authService.validateSpotifyToken(
        accessToken,
      );

      if (spotifyUser) {
        const jwt = this.authService.createJwt(spotifyUser); // JWT 생성 로직
        console.log('JWT 발급 : ', jwt);
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
