import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(3000, () => {
    console.log(
      'Database connected and server running on http://localhost:3000',
    );
  });
}

bootstrap().catch((err) => {
  console.error('Error:', err);
});
