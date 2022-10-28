/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import {
  HandleValidationErrors,
  AllExceptionFilter,
  LoggerService,
  ApiGuardGuard,
  EnvironmentConfigService,
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

  // API guard
  app.useGlobalGuards(
    new ApiGuardGuard(
      new LoggerService(),
      new EnvironmentConfigService(new ConfigService())
    )
  );

  const port = process.env.USER_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
