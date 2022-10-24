import { Injectable, Inject } from '@nestjs/common';
import { UseCaseProxy, UserUseCasesProxyModule } from '@getfit/infra';

import { CheckTokenUseCase } from '@getfit/user';

@Injectable()
export class AppService {
  constructor(
    @Inject(UserUseCasesProxyModule.CHECK_TOKEN_USECASES_PROXY)
    private readonly checkTokenUsecaseProxy: UseCaseProxy<CheckTokenUseCase>
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to orch!' };
  }

  async checkToken(token: string) {
    return await this.checkTokenUsecaseProxy.getInstance().checkToken(token);
  }
}
