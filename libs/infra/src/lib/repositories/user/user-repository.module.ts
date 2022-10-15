import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { TypeormModule } from '../../config/typeorm/typeorm.module';
import { UserRepository } from './user.repository';
import { ExceptionsModule } from '../../exceptions/exceptions.module';
import { LoggerModule } from '../../logger/logger.module';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';

@Module({
  imports: [
    TypeormModule,
    TypeOrmModule.forFeature([UserEntity]),
    LoggerModule,
    ExceptionsModule,
  ],
  providers: [UserRepository, ExceptionsService, LoggerService],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
