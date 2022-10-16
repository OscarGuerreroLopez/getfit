export interface IJwtServicePayload {
  username: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<{ [key: string]: any }>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string;
}
