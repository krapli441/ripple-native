import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { SpotifyAuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'spotify' }),
    MongooseModule.forRoot('mongodb://localhost:27017/ripple'),
    UserModule,
  ],
  controllers: [AppController, SpotifyAuthController],
  providers: [AppService],
})
export class AppModule {}
