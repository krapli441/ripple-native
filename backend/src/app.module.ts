import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { SpotifyStrategyService } from './auth/spotify-strategy/spotify-strategy.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'spotify' })],
  controllers: [AppController, AuthController],
  providers: [AppService, SpotifyStrategyService],
})
export class AppModule {}
