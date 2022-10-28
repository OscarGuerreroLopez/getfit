import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  JWT_SECRET!: string;
  @IsString()
  JWT_EXPIRATION_TIME!: string;
  @IsNumber()
  ORCH_PORT!: number;
  @IsNumber()
  USER_PORT!: number;
  @IsNumber()
  EXERCISE_PORT!: number;
  @IsString()
  USER_LOCAL_URL!: string;
  @IsString()
  EXERCISE_LOCAL_URL!: string;
  @IsString()
  USER_DOCKER_URL!: string;
  @IsString()
  EXERCISE_DOCKER_URL!: string;
  @IsString()
  API_KEY!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
