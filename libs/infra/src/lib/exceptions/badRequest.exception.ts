import {
  IFormatExceptionMessage,
  BadRequestException as BadRequestExceptionImp,
} from '@getfit/domain';
import { HttpException } from './httpException';

export class BadRequestException
  extends HttpException
  implements BadRequestExceptionImp
{
  constructor(data: IFormatExceptionMessage) {
    super(400, data.message, data.code_error);
  }
}
