/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  HandleValidationErrors,
  AllExceptionFilter,
  LoggerService,
} from '@getfit/infra';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: HandleValidationErrors,
    })
  );
  const globalPrefix = 'exercise';

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.EXERCISE_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
