import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SpotifyStrategy } from './spotify.strategy';

@Module({
  imports: [PassportModule],
  providers: [SpotifyStrategy],
})
export class AuthModule {}
