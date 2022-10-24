import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTConfig } from '@getfit/domain';

@Injectable()
export class EnvironmentConfigService implements JWTConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME') || '';
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || '';
  }
  getLocalUserUrl(): string {
    return this.configService.get<string>('USER_LOCAL_URL') || '';
  }
  getLocalExerciseUrl(): string {
    return this.configService.get<string>('EXERCISE_LOCAL_URL') || '';
  }

  getDockerUserUrl(): string {
    return this.configService.get<string>('USER_DOCKER_URL') || '';
  }
  getDockerExerciseUrl(): string {
    return this.configService.get<string>('EXERCISE_EXERCISE_URL') || '';
  }

  getApiKey(): string {
    return this.configService.get<string>('API_key') || '';
  }
}
