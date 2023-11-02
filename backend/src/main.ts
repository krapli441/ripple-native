import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { AllExceptionsFilter } from './filters/exeption-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Passport 초기화
  app.use(passport.initialize());

  app.useGlobalFilters(new AllExceptionsFilter());

  // express-session 설정
  app.use(
    session({
      secret: 'your-session-secret', // 실제 서비스에서는 안전한 키를 사용해야 함.
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
