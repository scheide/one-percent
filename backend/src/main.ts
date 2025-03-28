import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Add "api" prefix to all routes
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
