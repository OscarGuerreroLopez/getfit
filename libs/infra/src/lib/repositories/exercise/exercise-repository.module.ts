import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntityFactory } from '@getfit/exercise';
import { TypeormModule } from '../../config/typeorm/typeorm.module';
import { ExerciseEntity } from '../../entities/exercise.entity';
import { LoggerModule } from '../../logger/logger.module';
import { ExceptionsModule } from '../../exceptions/exceptions.module';
import { ExerciseRepositoryService } from './exercise-repository.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';

@Module({
  imports: [
    TypeormModule,
    TypeOrmModule.forFeature([ExerciseEntity]),
    LoggerModule,
    ExceptionsModule,
  ],
  providers: [
    ExerciseRepositoryService,
    ExceptionsService,
    LoggerService,
    {
      provide: ExerciseEntityFactory,
      useClass: ExerciseEntityFactory,
    },
  ],
  exports: [ExerciseRepositoryService],
})
export class ExerciseRepositoryModule {}
