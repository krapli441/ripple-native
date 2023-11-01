// auth/spotify.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
      scope: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    // 여기서 사용자 정보와 토큰을 데이터베이스에 저장하거나 검증할 수 있습니다.
    // 이 예제에서는 간단하게 프로필 정보만 반환합니다.
    return profile;
  }
}
