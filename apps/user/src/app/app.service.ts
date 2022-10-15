import { Injectable } from '@nestjs/common';
import { user } from '@getfit/user';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: user() };
  }
}
