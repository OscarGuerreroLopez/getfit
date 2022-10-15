import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { TypeormModule } from '../../config/typeorm/typeorm.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeormModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
