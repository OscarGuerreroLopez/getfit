import { Module } from '@nestjs/common';
import {
  ExerciseUseCasesProxyModule,
  UserUseCasesProxyModule,
} from '@getfit/infra';
import { AppController } from './app.controller';

@Module({
  imports: [
    ExerciseUseCasesProxyModule.register(),
    UserUseCasesProxyModule.register(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
