import { Module } from '@nestjs/common';
import {
  ExerciseUseCasesProxyModule,
  ExceptionsModule,
  ExceptionsService,
  LoggerModule,
  LoggerService,
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '@getfit/infra';
import { AppController } from './app.controller';

@Module({
  imports: [
    ExerciseUseCasesProxyModule.register(),
    ExceptionsModule,
    LoggerModule,
    EnvironmentConfigModule,
  ],
  controllers: [AppController],
  providers: [ExceptionsService, LoggerService, EnvironmentConfigService],
})
export class AppModule {}
