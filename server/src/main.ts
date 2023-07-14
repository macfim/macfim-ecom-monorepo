import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(PinoLogger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') as number;

  app.enableCors();
  setTimeout(
    () => Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap'),
    100,
  );

  app.setGlobalPrefix('api');

  await app.listen(PORT);
}
bootstrap();
