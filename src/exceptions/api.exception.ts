import { HttpException } from '@nestjs/common';

/**
 * Api Exception class
 *
 * @export
 * @class ApiException
 * @extends {HttpException}
 */
export class ApiException extends HttpException {
  errorCode?: number;
  errors?: any;

  constructor(
    message: string | Record<string, any>,
    status = 500,
    errorCode?: number,
    errors?: any,
  ) {
    super(message, status);
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
