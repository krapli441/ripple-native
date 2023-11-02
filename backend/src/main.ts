import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 로그 메시지 추가 (Passport 초기화 전)
  console.log('Before Passport initialization');

  // Passport 초기화
  app.use(passport.initialize());

  // 로그 메시지 추가 (Passport 초기화 후)
  console.log('After Passport initialization');

  await app.listen(3000);
}
bootstrap();
