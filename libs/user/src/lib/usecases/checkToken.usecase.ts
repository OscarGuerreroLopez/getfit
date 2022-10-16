import { IJwtService, ILogger, IException } from '@getfit/domain';
import { UserRepository } from '../entities/repositories';

export class CheckTokenUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly userRepository: UserRepository,
    private readonly exceptionService: IException
  ) {}

  async checkToken(token: string) {
    let decoded: { [key: string]: any } = {};
    try {
      decoded = await this.jwtTokenService.checkToken(token);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.warn(
          'check token',
          `Error decoding token: ${error.message}`
        );
      } else {
        this.logger.warn(
          'check token',
          `Error decoding token: ${JSON.stringify(error)}`
        );
      }

      this.exceptionService.forbiddenException({
        message: `You are not authorized`,
      });
    }

    return decoded;
  }
}
