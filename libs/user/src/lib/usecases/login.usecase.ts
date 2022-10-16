import {
  IBcryptService,
  IJwtServicePayload,
  IJwtService,
  JWTConfig,
  ILogger,
} from '@getfit/domain';
import { UserRepository } from '../entities/repositories';
import { ExceptionsService } from '@getfit/infra';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exceptionService: ExceptionsService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (!match) {
      this.logger.warn(
        'user validation login',
        `${username} password mismatch`
      );
      this.exceptionService.UnauthorizedException({
        message: 'Something went wrong, check logs',
      });
    }
    this.logger.log(
      'LoginUseCases execute',
      `The user ${username} have been logged.`
    );
    const payload: IJwtServicePayload = { username: username };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return { token };
  }
}
