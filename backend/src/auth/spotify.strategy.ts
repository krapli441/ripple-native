import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  private readonly logger = new Logger(SpotifyStrategy.name);

  constructor(private configService: ConfigService) {
    super({
      authorizationURL: 'https://accounts.spotify.com/authorize',
      tokenURL: 'https://accounts.spotify.com/api/token',
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: 'http://192.168.0.215:3000/auth/spotify/callback',
      scope: ['user-read-email', 'user-read-private'],
      // PKCE 옵션 추가
      state: true,
      pkce: false,
    });

    this.logger.log('SpotifyStrategy initialized');
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    try {
      this.logger.log('Entering SpotifyStrategy validate');
      console.log('SpotifyStrategy validate', profile);
      this.logger.log(`Access Token: ${accessToken}`);
      this.logger.log(`Refresh Token: ${refreshToken}`);
      this.logger.log('Profile returned:', profile);
      return profile;
    } catch (error) {
      this.logger.error('Error in SpotifyStrategy validate:', error);
      throw error; // 예외를 다시 던져 NestJS의 기본 예외 처리기에게 예외를 처리하도록 합니다.
    }
  }
}
