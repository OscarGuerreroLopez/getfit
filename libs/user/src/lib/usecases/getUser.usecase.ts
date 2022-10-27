import { IException, ILogger } from '@getfit/domain';

import { UserModelWithoutPassword } from '../entities/model';
import { IUserRepository } from '../entities/repositories';

export class GetUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly exceptionService: IException,
    private readonly logger: ILogger
  ) {}

  async execute(
    userName: string,
    request_code = '0'
  ): Promise<UserModelWithoutPassword> {
    try {
      const user = await this.userRepository.getUserByUsername(userName);
      if (!user) {
        throw `User ${userName} not found on the DB`;
      }

      return user;
    } catch (error) {
      this.logger.warn(
        'GetUserUseCase',
        `${JSON.stringify(error)} request-code=${request_code}`
      );
      throw this.exceptionService.userNotFound({
        message: 'Error getting the user, check logs',
        code_error: 404,
      });
    }
  }
}
