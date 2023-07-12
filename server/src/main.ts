import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');

  await app.listen(PORT);
}

bootstrap();
