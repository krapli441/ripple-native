import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get('SPOTIFY_CLIENT_SECRET'),
      callbackURL: 'http://192.168.0.215:3000/auth/spotify/callback',
      scope: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 여기에서 사용자 정보를 DB와 비교하거나 JWT를 생성할 수 있음.
    return profile;
  }

  getAuthorizeUrl(): string {
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const redirectUri = 'http://localhost:3000/auth/spotify/callback';
    const scopes = [
      'user-read-email',
      'playlist-modify-public',
      'user-read-private',
    ].join('%20');

    return `${baseUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
  }
}
