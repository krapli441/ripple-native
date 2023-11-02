import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyOAuth2Strategy extends PassportStrategy(
  OAuth2Strategy,
  'spotify-oauth2',
) {
  constructor(private configService: ConfigService) {
    super({
      authorizationURL: 'https://accounts.spotify.com/authorize',
      tokenURL: 'https://accounts.spotify.com/api/token',
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: 'http://192.168.0.215:3000/auth/spotify/callback',
      scope: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
      passReqToCallback: true,
      state: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    req: any,
  ) {
    console.log('AccessToken:', accessToken);
    console.log('RefreshToken:', refreshToken);
    console.log('Profile:', profile);
    // 여기서 사용자 정보를 처리하고 반환한다.
    return profile;
  }
}
