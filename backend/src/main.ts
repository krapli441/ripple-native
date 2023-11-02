import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Passport 초기화
  app.use(passport.initialize());

  await app.listen(3000);
}
bootstrap();
