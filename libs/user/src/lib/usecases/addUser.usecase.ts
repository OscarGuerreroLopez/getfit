import { IBcryptService, ILogger } from '@getfit/domain';
import { UserModel, UserModelWithoutPassword } from '../domain/model';
import { UserRepository } from '../domain/repositories';

export class AddUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: ILogger,
    private readonly bcrypt: IBcryptService
  ) {}

  async execute(userDetail: UserModel): Promise<UserModelWithoutPassword> {
    const hashPassword = await this.bcrypt.hash(userDetail.password);
    const result = await this.userRepository.insertUser({
      ...userDetail,
      password: hashPassword,
    });
    this.logger.log('UserDetailUseCase', `User ${userDetail.username} added`);
    return result;
  }
}
