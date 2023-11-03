import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Controller('auth/spotify')
export class SpotifyAuthController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
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

      console.log('getUserProfile:', userProfile);

      const user = await this.userService.create({
        username: userProfile.display_name,
        email: userProfile.email,
        accessToken: tokenResponse.data.access_token,
        refreshToken: tokenResponse.data.refresh_token,
      });

      return user;
    } catch (error) {
      console.error(error.response?.data);
      throw error;
    }
  }
}
