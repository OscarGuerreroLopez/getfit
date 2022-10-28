import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): BadRequestException;
  internalServerErrorException(
    data?: IFormatExceptionMessage
  ): InternalServerErrorException;
  forbiddenException(data?: IFormatExceptionMessage): ForbiddenException;
  UnauthorizedException(data?: IFormatExceptionMessage): UnauthorizedException;
  userNotFound(data?: IFormatExceptionMessage): NotFoundException;
}
