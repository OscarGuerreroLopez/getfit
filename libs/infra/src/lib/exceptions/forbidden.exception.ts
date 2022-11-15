import {
  IFormatExceptionMessage,
  ForbiddenException as ForbiddenExceptionImp,
} from '@getfit/domain';
import { HttpException } from './httpException';

export class ForbiddenException
  extends HttpException
  implements ForbiddenExceptionImp
{
  constructor(data: IFormatExceptionMessage) {
    super(403, data.message, data.code_error);
  }
}
