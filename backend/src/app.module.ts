import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { SpotifyAuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { HttpModule } from '@nestjs/axios';
import { RipplesModule } from './ripples/ripples.module';
import { MusicTagService } from './music-tag/music-tag.service';
import { MusicTagController } from './music-tag/music-tag.controller';
import { MusicTagModule } from './music-tag/music-tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'spotify' }),
    MongooseModule.forRoot('mongodb://localhost:27017/ripple'),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    HttpModule,
    RipplesModule,
    MusicTagModule,
  ],
  controllers: [AppController, SpotifyAuthController, SearchController, MusicTagController],
  providers: [AppService, SearchService, MusicTagService],
})
export class AppModule {}
