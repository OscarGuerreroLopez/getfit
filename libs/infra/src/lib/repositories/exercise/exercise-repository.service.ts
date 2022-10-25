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
    const exerciseEntity = this.toExerciseEntity(exercise);
    const result = await this.exerciseRepository.save(exerciseEntity);

    return this.toExerciseModel(result);
  }

  private toExerciseModel(exerciseDetailEntity: ExerciseEntity): ExerciseModel {
    const exerciseDetail: ExerciseModel = new ExerciseModel();
    exerciseDetail.id = exerciseDetailEntity.id;
    exerciseDetail.userId = exerciseDetailEntity.userId;
    exerciseDetail.content = exerciseDetailEntity.content;
    exerciseDetail.created_at = exerciseDetailEntity.created_at;

    return exerciseDetail;
  }

  private toExerciseEntity(exerciseModel: ExerciseModel): ExerciseEntity {
    const exerciseDetail: ExerciseEntity = new ExerciseEntity();

    exerciseDetail.id = exerciseModel.id;
    exerciseDetail.userId = exerciseModel.userId;
    exerciseDetail.content = exerciseModel.content;
    exerciseDetail.created_at = exerciseModel.created_at;

    return exerciseDetail;
  }
}
