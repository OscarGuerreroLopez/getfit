import { IFormatExceptionMessage } from '@getfit/domain';

export class HttpException extends Error {
  status: number;
  message: string;
  code_error: number;

  constructor(status: number, message: string, code_error?: number) {
    super(message);
    this.status = status;
    this.message = message;
    this.code_error = code_error || 0;
  }

  getStatus() {
    return this.status;
  }

  getMessage(): IFormatExceptionMessage {
    return { message: this.message, code_error: this.code_error };
  }
}
