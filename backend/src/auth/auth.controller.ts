import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('auth/spotify')
export class SpotifyAuthController {
  constructor(private configService: ConfigService) {}

  @Post('token')
  async getToken(@Body('code') code: string) {
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');
    const redirectUri = 'com.ripple:/oauth';

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
