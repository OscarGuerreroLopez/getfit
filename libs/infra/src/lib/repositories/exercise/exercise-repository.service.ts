import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
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

  async getExercises(
    userId: number
  ): Promise<{ exercises: ExerciseModel[]; count: number }> {
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

  async insert(exercise: ExerciseModel): Promise<ExerciseModel> {
    const { userId, content, created_at } = exercise;
    const exerciseModel = new ExerciseModel({ userId, content, created_at });
    const exerciseEntity = await this.toExerciseEntity(exerciseModel);
    const result = await this.exerciseRepository.save(exerciseEntity);

    return this.toExerciseModel(result);
  }

  private toExerciseModel(exerciseEntity: ExerciseEntity): ExerciseModel {
    const exerciseModel: ExerciseModel = new ExerciseModel({
      id: exerciseEntity.id,
      userId: exerciseEntity.userId,
      content: exerciseEntity.content,
      created_at: exerciseEntity.created_at,
    });

    return exerciseModel;
  }

  private async toExerciseEntity(
    exerciseModel: ExerciseModel
  ): Promise<ExerciseEntity> {
    const exerciseEntity: ExerciseEntity = new ExerciseEntity();

    exerciseEntity.id = exerciseModel.id;
    exerciseEntity.userId = exerciseModel.userId;
    exerciseEntity.content = exerciseModel.content;
    exerciseEntity.created_at = exerciseModel.created_at;

    const errors = await validate(exerciseEntity);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    return exerciseEntity;
  }
}
