import { IBcryptService, IException, ILogger } from '@getfit/domain';
import { UserModel, UserModelWithoutPassword } from '../entities/model';
import { IUserRepository } from '../entities/repositories';

export class AddUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
    private readonly bcrypt: IBcryptService,
    private readonly exceptionService: IException
  ) {}

  async execute(
    userDetail: UserModel,
    request_code = '0'
  ): Promise<UserModelWithoutPassword> {
    try {
      const hashPassword = await this.bcrypt.hash(userDetail.password);
      const result = await this.userRepository.insertUser({
        ...userDetail,
        password: hashPassword,
      });
      this.logger.log(
        'UserDetailUseCase',
        `User ${userDetail.username} added. request-code=${request_code}`
      );
      return result;
    } catch (error) {
      this.logger.warn(
        'AddUserUseCase',
        `${JSON.stringify(error)} request-code=${request_code}`
      );
      throw this.exceptionService.badRequestException({
        message: 'Error adding the user, check logs',
        code_error: 444,
      });
    }
  }
}
