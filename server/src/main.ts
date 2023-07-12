import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') as number;

  app.enableCors();

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');

  await app.listen(PORT);
}
bootstrap();
