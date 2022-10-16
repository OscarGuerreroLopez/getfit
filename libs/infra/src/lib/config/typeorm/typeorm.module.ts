import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { ExerciseEntity } from '../../entities/exercise.entity';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
  ({
    type: 'sqlite',
    database: 'user',
    entities: [UserEntity, ExerciseEntity],
    synchronize: true,
    logging: true,
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeormModule {}
