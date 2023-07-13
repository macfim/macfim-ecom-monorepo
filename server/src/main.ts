import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') as number;

  app.enableCors();

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');

  app.setGlobalPrefix('api');

  await app.listen(PORT);
}
bootstrap();
