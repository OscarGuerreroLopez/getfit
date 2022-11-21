import { IException, ILogger } from '@getfit/domain';
import { ExerciseModel } from '../entities/model';

import { IExerciseRepository } from '../entities/repositories';

export interface IGetExercise {
  exercises: ExerciseModel[];
  count: number;
}

export class GetExercisesUseCase {
  constructor(
    private readonly exerciseRepository: IExerciseRepository,
    private readonly logger: ILogger,
    private readonly exception: IException
  ) {}

  async execute(userId: number, request_code = '0'): Promise<IGetExercise> {
    try {
      return await this.exerciseRepository.getExercises(userId);
    } catch (error) {
      this.logger.warn(
        'GetUExerciseUseCase',
        `${
          error instanceof Error ? error.message : JSON.stringify(error)
        }. request-code=${request_code}`
      );
      throw this.exception.badRequestException({
        message: 'Error getting the exercise, check logs',
        code_error: 400,
      });
    }
  }
}
