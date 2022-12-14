import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExerciseRepository, ExerciseModel } from '@getfit/exercise';
import { ExerciseEntity } from '../../entities/exercise.entity';

@Injectable()
export class ExerciseRepositoryService implements IExerciseRepository {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>
  ) {}

  async getExercises(userId: number): Promise<{
    exercises: ExerciseModel[];
    count: number;
  }> {
    const exercisesEntity = await this.exerciseRepository.findAndCount({
      where: {
        userId,
      },
    });

    const exercises = exercisesEntity[0].map((exerciseEntity) =>
      this.toExerciseModel(exerciseEntity)
    );

    const count = exercisesEntity[1];

    return { exercises, count };
  }

  async getExercise(exerciseId: string): Promise<ExerciseModel> {
    const exerciseEntity = await this.exerciseRepository.findOne({
      where: {
        exerciseId,
      },
    });

    if (!exerciseEntity) {
      throw new Error(`Exercise ${exerciseId} not found`);
    }

    return this.toExerciseModel(exerciseEntity);
  }

  async insert(exercise: ExerciseModel): Promise<ExerciseModel> {
    const exerciseEntity = this.toExerciseEntity(exercise);
    const result = await this.exerciseRepository.save(exerciseEntity);

    return this.toExerciseModel(result);
  }

  async update(exercise: ExerciseModel): Promise<ExerciseModel> {
    const exerciseEntity = this.toExerciseEntity(exercise);
    const result = await this.exerciseRepository.update(
      {
        exerciseId: exerciseEntity.exerciseId,
      },
      exerciseEntity
    );

    if (result.affected === 0) {
      throw new Error(`cannot update ${exercise.id}. No record found`);
    }

    return exercise;
  }

  private toExerciseModel(exerciseEntity: ExerciseEntity): ExerciseModel {
    const { exerciseId, userId, content, created_at } = exerciseEntity;

    const exerciseModel = ExerciseModel.create({
      userId,
      content,
      created_at,
      id: exerciseId,
    });

    return exerciseModel;
  }

  private toExerciseEntity(exerciseModel: ExerciseModel): ExerciseEntity {
    const exerciseEntity: ExerciseEntity = new ExerciseEntity();

    exerciseEntity.exerciseId = exerciseModel.id;
    exerciseEntity.userId = exerciseModel.userId;
    exerciseEntity.content = exerciseModel.content;
    exerciseEntity.created_at = exerciseModel.created_at;

    return exerciseEntity;
  }
}
