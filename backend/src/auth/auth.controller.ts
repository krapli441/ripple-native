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
    try {
      const { accessToken, expiresIn } = await this.getSpotifyAccessToken(body);
      const expiryDate = new Date(new Date().getTime() + expiresIn * 1000); // 토큰 만료시간
      const userProfile = await this.getSpotifyUserProfile(accessToken);

      let user = await this.userService.findByEmail(userProfile.email);
      if (user) {
        user = await this.userService.update(user._id, {
          accessToken: accessToken,
          refreshToken: userProfile.refreshToken,
          tokenExpiry: expiryDate,
        });
      } else {
        user = await this.userService.create({
          username: userProfile.display_name,
          email: userProfile.email,
          accessToken: accessToken,
          refreshToken: userProfile.refreshToken,
          tokenExpiry: expiryDate,
        });
      }

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

  private async getSpotifyAccessToken(body: {
    code: string;
    codeVerifier: string;
  }): Promise<{ accessToken: string; expiresIn: number }> {
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

    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return {
      accessToken: tokenResponse.data.access_token,
      expiresIn: tokenResponse.data.expires_in,
    };
  }

  private async getSpotifyUserProfile(accessToken: string): Promise<any> {
    const userProfileResponse = await axios.get(
      'https://api.spotify.com/v1/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return userProfileResponse.data;
  }

  private async refreshAccessToken(refreshToken: string): Promise<string> {
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return tokenResponse.data.access_token;
  }
}
