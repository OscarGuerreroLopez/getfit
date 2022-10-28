import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@getfit/domain';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class GetUserGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = request.headers['user'];

    if (!user) {
      this.logger.error('User Guard', 'User missing on the headers');
      return false;
    }

    const parsedUser = JSON.parse(user);

    const ctxUser = request.params.username;

    if (parsedUser.username === ctxUser || parsedUser.role === Role.Admin) {
      return true;
    }

    this.logger.error(
      'User Guard',
      `User ${parsedUser.username} trying to get info from ${ctxUser}`
    );

    return false;
  }
}
