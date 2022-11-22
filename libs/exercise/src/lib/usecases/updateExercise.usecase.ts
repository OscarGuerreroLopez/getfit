import { ILogger, IException } from '@getfit/domain';
import { IExerciseRepository } from '../entities/repositories';

interface params {
  exerciseId: string;
  userId: number;
  content: string;
}

export class UpdateExerciseUseCase {
  constructor(
    private readonly exerciseRepository: IExerciseRepository,
    private readonly logger: ILogger,
    private readonly exception: IException
  ) {}

  async execute(exercise: params, request_code = '0') {
    const { exerciseId, userId, content } = exercise;

    try {
      const original = await this.exerciseRepository.getExercise(exerciseId);

      if (!original) {
        throw new Error(`Not able to find the exercise in DB ${exerciseId}`);
      }

      if (original.userId !== userId) {
        throw new Error(
          `user ${userId} is trying to update an exercise that belongs to ${original.userId}. ExerciseID: ${exerciseId} `
        );
      }

      if (original.content === content) {
        throw new Error(`Nothing to update`);
      } else {
        original.content = content;
      }

      const result = await this.exerciseRepository.update(original);

      return result;
    } catch (error) {
      this.logger.warn(
        'UpdateUExerciseUseCase',
        `${
          error instanceof Error ? error.message : JSON.stringify(error)
        }. request-code=${request_code}`
      );
      throw this.exception.badRequestException({
        message: 'Error updating the exercise, check logs',
        code_error: 333,
      });
    }
  }
}
