import { ILogger } from '@getfit/domain';
import { UserModel, UserModelWithoutPassword } from '../domain/model';
import { UserRepository } from '../domain/repositories';

export class AddUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: ILogger
  ) {}

  async execute(userDetail: UserModel): Promise<UserModelWithoutPassword> {
    const result = await this.userRepository.insertUser(userDetail);
    this.logger.log('UserDetailUseCase', `User ${userDetail.username} added`);
    return result;
  }
}
