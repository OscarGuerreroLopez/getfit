import { Injectable } from '@nestjs/common';
import { IException, IFormatExceptionMessage } from '@getfit/domain';
import { BadRequestException } from './badRequest.exception';
import { ForbiddenException } from './forbidden.exception';
import { UnauthorizedException } from './unauthorize.exception';
import { NotFoundException } from './userNotFound.exception';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage) {
    return new BadRequestException(data);
  }
  forbiddenException(data: IFormatExceptionMessage) {
    return new ForbiddenException(data);
  }
  userNotFound(data: IFormatExceptionMessage) {
    return new NotFoundException(data);
  }
  unauthorizedException(data: IFormatExceptionMessage) {
    return new UnauthorizedException(data);
  }
}
