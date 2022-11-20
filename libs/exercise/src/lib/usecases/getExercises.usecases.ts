import { IException, ILogger } from '@getfit/domain';

import { IExerciseRepository } from '../entities/repositories';

export interface IExerciseWithUser {
  id: string;
  user: {
    name: string;
    id: number;
  };
  content: string;
  created_at: Date;
}

export interface IGetExercise {
  count: number;
  exercises: {
    id: string;
    user: {
      name: string;
      id: number;
    };
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

  async execute(
    userId: number,
    username: string,
    request_code = '0'
  ): Promise<IGetExercise> {
    try {
      const { exercises, count } = await this.exerciseRepository.getExercises(
        userId
      );

      const exercisesMap: IExerciseWithUser[] = exercises.map((exercise) => {
        const result = {
          id: exercise.id,
          user: { name: username, id: exercise.userId },
          content: exercise.content,
          created_at: exercise.created_at,
        };

        return result;
      });

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
