import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/spotify')
export class SpotifyAuthController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('token')
  async getToken(@Body() body: { code: string; codeVerifier: string }) {
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');
    const redirectUri = 'com.ripple:/oauth';

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', body.code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code_verifier', body.codeVerifier);

    try {
      const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const accessToken = tokenResponse.data.access_token;

      // 액세스 토큰을 사용하여 사용자의 프로필 정보를 가져옴.
      const userProfileResponse = await axios.get(
        'https://api.spotify.com/v1/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const userProfile = userProfileResponse.data;

      // 데이터베이스에서 사용자 조회
      let user = await this.userService.findByEmail(userProfile.email);

      if (user) {
        // 사용자가 이미 존재하는 경우: 정보 업데이트
        user = await this.userService.update(user._id, {
          accessToken: tokenResponse.data.access_token,
          refreshToken: tokenResponse.data.refresh_token,
          // 필요한 경우 다른 필드도 업데이트
        });
      } else {
        // 새로운 사용자 생성
        user = await this.userService.create({
          username: userProfile.display_name,
          email: userProfile.email,
          accessToken: tokenResponse.data.access_token,
          refreshToken: tokenResponse.data.refresh_token,
        });
      }

      // 사용자 정보를 바탕으로 JWT 토큰 생성
      const jwtPayload = { email: user.email, userId: user._id };
      const jwtToken = this.jwtService.sign(jwtPayload);

      return {
        user,
        jwtToken,
      };
    } catch (error) {
      console.error(error.response?.data);
      throw error;
    }
  }
}
