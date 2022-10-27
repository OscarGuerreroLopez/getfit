import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ApiGuardGuard implements CanActivate {
  constructor(
    private readonly logger: LoggerService,
    private readonly envConfig: EnvironmentConfigService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const apikey = request.headers['api-key'];

    if (apikey === this.envConfig.getApiKey()) {
      return true;
    }

    this.logger.error('apikey guard', 'api key missmatch');

    return false;
  }
}
