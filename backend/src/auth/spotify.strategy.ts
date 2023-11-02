// src/auth/spotify.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor() {
    super({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://192.168.0.215:3000/auth/spotify/callback',
      scope: ['user-read-email', 'user-read-private'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 여기서 사용자 정보를 데이터베이스에 저장하거나 기존 사용자를 찾을 수 있다.
    // 현재는 간단하게 프로필을 반환하도록 한다.
    return profile;
  }
}
