import { ExerciseModel } from '../entities/model';
import { ExerciseRepository } from '../entities/repositories';

export class GetExercisesUseCase {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async execute(userId: number, username: string): Promise<ExerciseModel[]> {
    const result = await this.exerciseRepository.getExercises(userId);

    const response = result.exercises.map((exercise) => ({
      ...exercise,
      user: { name: username },
    }));

    return response;
  }
}
