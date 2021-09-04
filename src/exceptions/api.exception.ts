import { HttpException } from '@nestjs/common';

export interface ApiExceptionOptions {
  errorCode?: number;
  errors?: any;
}

/**
 * Api Exception class
 *
 * @export
 * @class ApiException
 * @extends {HttpException}
 */
export class ApiException extends HttpException {
  options: ApiExceptionOptions;

  constructor(
    message: string | Record<string, any>,
    status = 500,
    options: ApiExceptionOptions = {},
  ) {
    super(message, status);
    this.options = options;
  }
}
