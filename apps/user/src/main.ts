/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {
  HandleValidationErrors,
  AllExceptionFilter,
  LoggerService,
} from '@getfit/infra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: HandleValidationErrors,
    })
  );
  const globalPrefix = 'user';
  app.setGlobalPrefix(globalPrefix);

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
