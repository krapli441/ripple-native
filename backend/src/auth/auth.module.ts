import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SpotifyStrategy } from './spotify.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [SpotifyStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
