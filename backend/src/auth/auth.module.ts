import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SpotifyStrategy } from './spotify.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [SpotifyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
