import {
  IBcryptService,
  IJwtServicePayload,
  IJwtService,
  IJWTConfig,
  ILogger
} from '@getfit/domain';
import { IUserRepository } from '../entities/repositories';
import { ExceptionsService } from '@getfit/infra';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: IJWTConfig,
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exceptionService: ExceptionsService
  ) {}

  async validateUser(username: string, pass: string, request_code = '0') {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (!match) {
      this.logger.warn(
        'user validation login',
        `${username} password mismatch. request-code=${request_code}`
      );
      throw this.exceptionService.UnauthorizedException({
        message: 'Something went wrong, check logs'
      });
    }
    this.logger.log(
      'LoginUseCases execute',
      `The user ${username} have been logged. request-code=${request_code}`
    );
    const payload: IJwtServicePayload = { username: username };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 'h';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return { token };
  }
}
