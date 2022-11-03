import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IExerciseRepository,
  ExerciseModel,
  ExerciseEntityFactory,
} from '@getfit/exercise';
import { ExerciseEntity } from '../../entities/exercise.entity';

@Injectable()
export class ExerciseRepositoryService implements IExerciseRepository {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
    private readonly exerciseEntityFactory: ExerciseEntityFactory
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
    const exerciseModel =
      this.exerciseEntityFactory.createNewExerciseModel(exercise);
    const exerciseEntity = this.toExerciseEntity(exerciseModel);
    const result = await this.exerciseRepository.save(exerciseEntity);

    return this.toExerciseModel(result);
  }

  private toExerciseModel(exerciseEntity: ExerciseEntity): ExerciseModel {
    const { id, userId, content, created_at } = exerciseEntity;
    const exerciseModel = this.exerciseEntityFactory.createNewExerciseModel({
      id,
      userId,
      content,
      created_at,
    });

    return exerciseModel;
  }

  private toExerciseEntity(exerciseModel: ExerciseModel): ExerciseEntity {
    const exerciseEntity: ExerciseEntity = new ExerciseEntity();

    exerciseEntity.id = exerciseModel.id;
    exerciseEntity.userId = exerciseModel.userId;
    exerciseEntity.content = exerciseModel.content;
    exerciseEntity.created_at = exerciseModel.created_at;

    return exerciseEntity;
  }
}
