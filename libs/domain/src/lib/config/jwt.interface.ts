export interface JWTConfig {
  getJwtSecret(): string;
  getJwtExpirationTime(): string;
  getNodeEnv(): string;
  getLocalUserUrl(): string;
  getLocalExerciseUrl(): string;
  getDockerUserUrl(): string;
  getDockerExerciseUrl(): string;
  getApiKey(): string;
}
