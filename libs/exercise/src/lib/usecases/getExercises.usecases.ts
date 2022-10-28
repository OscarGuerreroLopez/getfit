import { IException, ILogger } from '@getfit/domain';
import { ExerciseModel } from '../entities/model';
import { IExerciseRepository } from '../entities/repositories';

export class GetExercisesUseCase {
  constructor(
    private readonly exerciseRepository: IExerciseRepository,
    private readonly logger: ILogger,
    private readonly exception: IException
  ) {}

  async execute(
    userId: number,
    username: string,
    request_code = '0'
  ): Promise<ExerciseModel[]> {
    try {
      const result = await this.exerciseRepository.getExercises(userId);

      const response = result.exercises.map((exercise) => ({
        ...exercise,
        user: { name: username }
      }));

      return response;
    } catch (error) {
      this.logger.warn(
        'GetUExerciseUseCase',
        `${
          error instanceof Error ? error.message : JSON.stringify(error)
        }. request-code=${request_code}`
      );
      throw this.exception.badRequestException({
        message: 'Error getting the exercise, check logs',
        code_error: 400
      });
    }
  }
}
