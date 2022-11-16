import {
  ILogger,
  IException,
  IExerciseRepository,
  IExerciseModel,
} from '@getfit/domain';
import { ExerciseModel } from '../models';

export class AddExerciseUseCase {
  constructor(
    private readonly exerciseRepository: IExerciseRepository,
    private readonly logger: ILogger,
    private readonly exception: IException
  ) {}

  async execute(
    userId: number,
    content: string,
    request_code = '0'
  ): Promise<ExerciseModel> {
    try {
      const { count } = await this.exerciseRepository.getExercises(userId);

      if (count > 9) {
        throw `user ${userId} has more than 10 exercises already`;
      }

      const created_at = new Date();

      const exerciseModel = ExerciseModel.create({
        userId,
        content,
        created_at,
      });

      const result = await this.exerciseRepository.insert(exerciseModel);

      this.logger.log(
        'AddUExerciseUseCase',
        `Exercise ${result.id} added. request-code=${request_code}`
      );

      return result;
    } catch (error) {
      this.logger.warn(
        'AddUExerciseUseCase',
        `${
          error instanceof Error ? error.message : JSON.stringify(error)
        }. request-code=${request_code}`
      );
      throw this.exception.badRequestException({
        message: 'Error adding the exercise, check logs',
        code_error: 222,
      });
    }
  }
}
