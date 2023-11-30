import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth/spotify')
export class SpotifyAuthController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('token')
  async getToken(@Body() body: { code: string; codeVerifier: string }) {
    console.log('Received request body:', body);
    try {
      const { accessToken, expiresIn, refresh_token } =
        await this.getSpotifyAccessToken(body);
      const expiryDate = new Date(new Date().getTime() + expiresIn * 1000); // 토큰 만료시간
      const userProfile = await this.getSpotifyUserProfile(accessToken);
      // console.log('User profile with refreshToken:', userProfile);

      let user = await this.userService.findByEmail(userProfile.email);
      if (user) {
        user = await this.userService.update(user._id, {
          accessToken: accessToken,
          refreshToken: refresh_token,
          tokenExpiry: expiryDate,
        });
        // console.log('Updated User with refreshToken:', user);
      } else {
        user = await this.userService.create({
          username: userProfile.display_name,
          email: userProfile.email,
          accessToken: accessToken,
          refreshToken: refresh_token,
          tokenExpiry: expiryDate,
        });
        // console.log('Created new User with refreshToken:', user);
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
  }): Promise<{
    accessToken: string;
    expiresIn: number;
    refresh_token: string;
  }> {
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
    // console.log('Spotify Token Response:', tokenResponse.data);
    return {
      accessToken: tokenResponse.data.access_token,
      expiresIn: tokenResponse.data.expires_in,
      refresh_token: tokenResponse.data.refresh_token,
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
    // console.log('Refresh Token Response:', tokenResponse.data);
    return tokenResponse.data.access_token;
  }

  @UseGuards(JwtAuthGuard)
  @Post('push-token')
  async updatePushToken(@Body() body: { pushToken: string }, @Request() req) {
    const userId = req.user.id;
    await this.userService.update(userId, { pushToken: body.pushToken });
    return { message: 'Push token updated' };
  }
}
