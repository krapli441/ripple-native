import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  private readonly logger = new Logger(SpotifyStrategy.name);

  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
      scope: ['user-read-email', 'user-read-private'],
    });

    this.logger.log('SpotifyStrategy initialized');
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('SpotifyStrategy validate', profile);
    return profile;
  }
}
