import {
  IBcryptService,
  IJwtServicePayload,
  IJwtService,
  IJWTConfig,
  ILogger,
  IException,
} from '@getfit/domain';
import { IUserRepository } from '../entities/repositories';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: IJWTConfig,
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exceptionService: IException
  ) {}

  async validateUser(username: string, pass: string, request_code = '0') {
    try {
      const user = await this.userRepository.getUserByUsername(username);
      if (!user) {
        throw new Error('user not found in DB');
      }
      const match = await this.bcryptService.compare(pass, user.password);
      if (!match) {
        throw new Error('Password missmatch');
      }

      const payload: IJwtServicePayload = { username: username };
      const secret = this.jwtConfig.getJwtSecret();
      const expiresIn = this.jwtConfig.getJwtExpirationTime() + 'h';
      const token = this.jwtTokenService.createToken(
        payload,
        secret,
        expiresIn
      );
      this.logger.log(
        'LoginUseCases execute',
        `The user ${username} have been logged. request-code=${request_code}`
      );
      return { token };
    } catch (error) {
      this.logger.warn(
        'user validation',
        `${username} not validated. request-code=${request_code}. ${
          error instanceof Error ? error.message : JSON.stringify(error)
        }`
      );
      throw this.exceptionService.unauthorizedException({
        message: 'Something went wrong, check logs',
        code_error: 333,
      });
    }
  }
}
