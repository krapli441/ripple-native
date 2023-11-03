import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { SpotifyStrategy } from './auth/spotify-strategy/spotify-strategy.service';
import { SpotifyAuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'spotify' }),
  ],
  controllers: [AppController, SpotifyAuthController],
  providers: [AppService, SpotifyStrategy],
})
export class AppModule {}
