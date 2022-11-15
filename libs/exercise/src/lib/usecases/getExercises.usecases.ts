import { IException, ILogger } from '@getfit/domain';

import { IExerciseRepository } from '../entities/repositories';

export class GetExercisesUseCase {
  constructor(
    private readonly exerciseRepository: IExerciseRepository,
    private readonly logger: ILogger,
    private readonly exception: IException
  ) {}

  async execute(userId: number, username: string, request_code = '0') {
    try {
      const { exercises, count } = await this.exerciseRepository.getExercises(
        userId
      );

      // const exercisesMap = exercises.map((exercise) => ({
      //   id: exercise.id,
      //   userId: exercise.userId,
      //   content: exercise.content.value,
      //   created_at: exercise.created_at,
      //   user: { name: username },
      // }));
      const exercisesMap = exercises.map((exercise) => ({
        ...exercise,
        user: { name: username },
      }));

      return {
        count,
        exercises: exercisesMap,
      };
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
