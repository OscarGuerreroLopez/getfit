import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Role } from '@getfit/domain';

import { UserUseCasesProxyModule } from '../../usecases-proxy/user.usecases.proxy.module';
import { CheckTokenUseCase } from '@getfit/user';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';

@Injectable()
export class GetUserGuard implements CanActivate {
  constructor(
    @Inject(UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY)
    private readonly checkTokenUsecaseProxy: UseCaseProxy<CheckTokenUseCase>
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authToken = request.headers.authorization.split(' ')[1];

    if (!authToken) {
      return false;
    }

    const decoded = await this.checkTokenUsecaseProxy
      .getInstance()
      .checkToken(authToken);

    request.user = decoded;

    console.log('@@@111', request.user);
    console.log('@@@222', request.params);
    const ctxUser = request.params.username;

    if (request.user.username === ctxUser || request.user.role === Role.Admin) {
      return true;
    }

    return false;
  }
}
