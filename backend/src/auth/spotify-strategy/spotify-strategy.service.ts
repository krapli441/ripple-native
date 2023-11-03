import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor() {
    super({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
      scope: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 여기에서 사용자 정보를 DB와 비교하거나 JWT를 생성할 수 있음.
    return profile;
  }
}
