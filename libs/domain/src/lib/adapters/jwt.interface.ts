export interface IJwtServicePayload {
  username: string;
}

export interface IJwtService {
  checkToken(
    token: string
  ): Promise<{ username: string; iat: number; exp: number }>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string;
}
