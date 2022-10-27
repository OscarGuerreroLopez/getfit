import { Module } from '@nestjs/common';
import {
  ExerciseUseCasesProxyModule,
  ExceptionsModule,
  ExceptionsService,
  LoggerModule,
  LoggerService,
} from '@getfit/infra';
import { AppController } from './app.controller';

@Module({
  imports: [
    ExerciseUseCasesProxyModule.register(),
    ExceptionsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [ExceptionsService, LoggerService],
})
export class AppModule {}
