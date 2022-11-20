import { IException, ILogger } from '@getfit/domain';

import { IExerciseRepository } from '../entities/repositories';

export interface IGetExercise {
  count: number;
  user: {
    name: string;
    userId: number;
  };
  exercises: {
    id: string;
    content: string;
    created_at: Date;
  }[];
}

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

      const exercisesMap = exercises.map((exercise) => {
        const result = {
          id: exercise.id,
          content: exercise.content,
          created_at: exercise.created_at,
        };

        return result;
      });

      return {
        count,
        user: { name: username, userId },
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
