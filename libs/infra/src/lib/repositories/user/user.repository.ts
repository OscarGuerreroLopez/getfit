import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  UserModel,
  UserRepository as UserDomainRepository,
} from '@getfit/user';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserRepository implements UserDomainRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>
  ) {}

  async getUserByUsername(username: string): Promise<UserModel> {
    const userDetailEntity = await this.userEntityRepository.findOne({
      where: { username },
    });

    if (!userDetailEntity) {
      console.error(`@@@user ${username} not found`);
      throw new Error('@@@no user');
    } else {
      return this.toUserModel(userDetailEntity);
    }
  }

  async insertUser(userModel: UserModel): Promise<UserModel> {
    const userDetailEntity: UserEntity = this.toUserEntity(userModel);

    const result = await this.userEntityRepository.save(userDetailEntity);

    const resultUser = this.toUserModel(result);

    return resultUser;
  }

  private toUserModel(userDetailEntity: UserEntity): UserModel {
    const userDetail: UserModel = new UserModel();

    if (!userDetailEntity.id) {
      console.error('@@@missing user id');
      throw new Error('@@@no userid');
    }

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
