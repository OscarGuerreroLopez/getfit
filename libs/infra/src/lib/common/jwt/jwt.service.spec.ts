import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule as Jwt } from '@nestjs/jwt';

import { JwtTokenService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Jwt.register({
          secret: 'xgfht543',
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [JwtTokenService],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a good token', async () => {
    const payload = {
      username: 'Oscar33',
    };
    const token = service.createToken(payload, 'xgfht543', '24h');

    expect(token).toBeDefined();

    const decoded = await service.checkToken(token);
    expect(decoded).toHaveProperty('username');
    expect(decoded.username).toStrictEqual('Oscar33');
  });
});
