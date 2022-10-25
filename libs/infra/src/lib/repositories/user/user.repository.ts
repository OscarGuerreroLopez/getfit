import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel, IUserRepository } from '@getfit/user';
import { UserEntity } from '../../entities/user.entity';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly exceptionService: ExceptionsService,
    private readonly loggerService: LoggerService
  ) {}

  async getUserByUsername(username: string): Promise<UserModel | null> {
    const userDetailEntity = await this.userEntityRepository.findOne({
      where: { username },
    });

    if (!userDetailEntity) {
      return null;
    }

    const resultUser = this.toUserModel(userDetailEntity);

    return resultUser;
  }

  async insertUser(userModel: UserModel): Promise<UserModel> {
    const userDetailEntity = this.toUserEntity(userModel);

    const result = await this.userEntityRepository.save(userDetailEntity);

    const resultUser = this.toUserModel(result);

    return resultUser;
  }

  private toUserModel(userDetailEntity: UserEntity): UserModel {
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
