import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@getfit/domain';

@Injectable()
export class GetUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = request.headers['user'];

    if (!user) {
      return false;
    }

    const parsedUser = JSON.parse(user);

    const ctxUser = request.params.username;

    if (parsedUser.username === ctxUser || parsedUser.role === Role.Admin) {
      return true;
    }

    return false;
  }
}
