import { ILogger, IException } from '@getfit/domain';
import { ExerciseModel } from '../entities/model';
import { IExerciseRepository } from '../entities/repositories';

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

      const result = await this.exerciseRepository.insert({
        userId,
        content,
        created_at
      });

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
        code_error: 400
      });
    }
  }
}
