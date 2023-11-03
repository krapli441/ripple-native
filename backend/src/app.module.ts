import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { SpotifyAuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  controllers: [AppController, SpotifyAuthController],
  providers: [AppService],
})
export class AppModule {}
