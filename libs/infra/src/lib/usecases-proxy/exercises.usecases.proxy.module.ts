import { DynamicModule, Module } from '@nestjs/common';

import {
  ExerciseRepositoryModule,
  ExerciseRepositoryService,
} from '../repositories/exercise';
import { UseCaseProxy } from './usecases-proxy';
import { AddExerciseUseCase } from '@getfit/exercise';

import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [ExerciseRepositoryModule, LoggerModule, ExceptionsModule],
})
export class ExerciseUseCasesProxyModule {
  // static GET_EXERCISES_DETAIL_USECASES_PROXY =
  //   'GetExercisesDetailUseCasesProxy';
  static ADD_EXERCISES_DETAIL_USECASES_PROXY =
    'AddExercisesDetailUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: ExerciseUseCasesProxyModule,
      providers: [
        {
          inject: [ExerciseRepositoryService, LoggerService, ExceptionsService],
          provide:
            ExerciseUseCasesProxyModule.ADD_EXERCISES_DETAIL_USECASES_PROXY,
          useFactory: (
            exerciseRepository: ExerciseRepositoryService,
            logger: LoggerService,
            exceptionsService: ExceptionsService
          ) =>
            new UseCaseProxy(
              new AddExerciseUseCase(
                exerciseRepository,
                logger,
                exceptionsService
              )
            ),
        },
      ],
      exports: [
        ExerciseUseCasesProxyModule.ADD_EXERCISES_DETAIL_USECASES_PROXY,
        // ExerciseUseCasesProxyModule.GET_EXERCISES_DETAIL_USECASES_PROXY,
      ],
    };
  }
}
