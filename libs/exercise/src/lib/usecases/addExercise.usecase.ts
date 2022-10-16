import { ILogger, IException } from '@getfit/domain';
import { ExerciseModel } from '../entities/model';
import { ExerciseRepository } from '../entities/repositories';

export class AddExerciseUseCase {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly logger: ILogger,
    private readonly exception: IException
  ) {}

  async execute(userId: number, content: string): Promise<ExerciseModel> {
    const { count } = await this.exerciseRepository.getExercises(userId);

    if (count > 9) {
      this.logger.warn(
        'Exercise insertion',
        `user ${userId} has more than 10 exercises already`
      );
      this.exception.badRequestException({ message: 'check logs' });
    }

    const created_at = new Date();

    const result = await this.exerciseRepository.insert({
      userId,
      content,
      created_at,
    });

    this.logger.log('Exercise insertion ', `Exercise ${result.id} added`);

    return result;
  }
}
