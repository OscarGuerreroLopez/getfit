import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  UserModel,
  UserRepository as UserDomainRepository,
} from '@getfit/user';
import { UserEntity } from '../../entities/user.entity';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class UserRepository implements UserDomainRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly exceptionService: ExceptionsService,
    private readonly loggerService: LoggerService
  ) {}

  async getUserByUsername(username: string): Promise<UserModel> {
    const userDetailEntity = await this.userEntityRepository.findOne({
      where: { username },
    });

    if (!userDetailEntity) {
      this.loggerService.log('user not found', `user ${username}`);
      this.exceptionService.userNotFound({
        message: `User not found`,
      });
    }

    return this.toUserModel(userDetailEntity as UserEntity);
  }

  async insertUser(userModel: UserModel): Promise<UserModel> {
    const userDetailEntity = this.toUserEntity(userModel);

    const result = await this.userEntityRepository.save(userDetailEntity);

    const resultUser = this.toUserModel(result);

    return resultUser;
  }

  private toUserModel(userDetailEntity: UserEntity): UserModel {
    if (!userDetailEntity?.id) {
      this.loggerService.warn(
        'toUser missing entity',
        JSON.stringify(userDetailEntity)
      );
      this.exceptionService.internalServerErrorException({
        message: 'Error converting user, check logs',
      });
    }
    const userDetail: UserModel = new UserModel();
    userDetail.id = userDetailEntity.id;
    userDetail.username = userDetailEntity.username;
    userDetail.password = userDetailEntity.password;

    return userDetail;
  }

  private toUserEntity(userModel: UserModel): UserEntity {
    const userDetail: UserEntity = new UserEntity();

    userDetail.id = userModel.id;
    userDetail.username = userModel.username;
    userDetail.password = userModel.password;

    return userDetail;
  }
}
