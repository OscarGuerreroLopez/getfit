import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
  ({
    type: 'sqlite',
    database: 'user',
    entities: [UserEntity],
    synchronize: true,
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
