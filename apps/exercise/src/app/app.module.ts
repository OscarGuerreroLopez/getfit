import { Module } from '@nestjs/common';
import {
  ExerciseUseCasesProxyModule,
  UserUseCasesProxyModule,
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '@getfit/infra';
import { AppController } from './app.controller';

@Module({
  imports: [
    ExerciseUseCasesProxyModule.register(),
    UserUseCasesProxyModule.register(),
    EnvironmentConfigModule,
  ],
  controllers: [AppController],
  providers: [EnvironmentConfigService],
})
export class AppModule {}
