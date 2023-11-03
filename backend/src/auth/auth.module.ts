import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SpotifyOAuth2Strategy } from './spotify-oauth2.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeVerifier, CodeVerifierSchema } from './code-verifier.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'CodeVerifier', schema: CodeVerifierSchema },
    ]),
  ],
  providers: [AuthService, SpotifyOAuth2Strategy],
  controllers: [AuthController],
})
export class AuthModule {}
