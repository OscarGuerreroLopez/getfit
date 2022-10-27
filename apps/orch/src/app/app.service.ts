import { Injectable, Inject } from '@nestjs/common';
import { UseCaseProxy, UserUseCasesProxyModule } from '@getfit/infra';

import { CheckTokenUseCase } from '@getfit/user';

@Injectable()
export class AppService {
  constructor(
    @Inject(UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY)
    private readonly checkTokenUsecaseProxy: UseCaseProxy<CheckTokenUseCase>
  ) {}

  async checkToken(token: string) {
    return await this.checkTokenUsecaseProxy.getInstance().execute(token);
  }
}
