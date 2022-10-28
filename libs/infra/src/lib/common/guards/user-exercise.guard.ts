import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class UserExerciseGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.headers['user'];

    if (!user) {
      this.logger.error('User Exercise Guard', 'User missing on the headers');
      return false;
    }

    return true;
  }
}
