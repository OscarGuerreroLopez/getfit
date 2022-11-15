import {
  IFormatExceptionMessage,
  UnauthorizedException as UnauthorizedExceptionImp,
} from '@getfit/domain';
import { HttpException } from './httpException';

export class UnauthorizedException
  extends HttpException
  implements UnauthorizedExceptionImp
{
  constructor(data: IFormatExceptionMessage) {
    super(401, data.message, data.code_error);
  }
}
