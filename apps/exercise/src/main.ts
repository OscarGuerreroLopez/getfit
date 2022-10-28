import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  HandleValidationErrors,
  AllExceptionFilter,
  LoggerService,
  ApiGuardGuard,
  EnvironmentConfigService,
  UserExerciseGuard,
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

  // API guard
  app.useGlobalGuards(
    new ApiGuardGuard(
      new LoggerService(),
      new EnvironmentConfigService(new ConfigService())
    )
  );

  // user guard
  app.useGlobalGuards(new UserExerciseGuard(new LoggerService()));

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.EXERCISE_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
