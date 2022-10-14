import { Injectable } from '@nestjs/common';
import { exercise } from "@getfit/exercise";

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: exercise() };
  }
}
