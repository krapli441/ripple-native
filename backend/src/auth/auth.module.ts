import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SpotifyStrategy } from './spotify.strategy';

@Module({
  providers: [AuthService, SpotifyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
