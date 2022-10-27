import { IJwtService, ILogger, IException } from '@getfit/domain';
import { IUserRepository } from '../entities/repositories';

export class CheckTokenUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly exceptionService: IException
  ) {}

  async execute(token: string, request_code = '0') {
    try {
      const decoded = await this.jwtTokenService.checkToken(token);
      const user = await this.checkuserExists(decoded.username);
      if (!user) {
        throw `User ${decoded.username} not found on DB`;
      }

      return {
        userId: user.id,
        username: user.username,
        role: user.role,
      };
    } catch (error) {
      this.logger.warn(
        'check token',
        `Error decoding token: ${JSON.stringify(
          error
        )} request-code=${request_code}`
      );

      throw this.exceptionService.forbiddenException({
        message: `You are not authorized`,
        code_error: 403,
      });
    }
  }

  private async checkuserExists(username: string) {
    return await this.userRepository.getUserByUsername(username);
  }
}
