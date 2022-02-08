import { HttpException } from '@nestjs/common';

export interface BaseExceptionOptions {
  errorCode?: string | number;
  errors?: any;
}

/**
 * Api Exception class
 *
 * @export
 * @class ApiException
 * @extends {HttpException}
 */
export class BaseException extends HttpException {
  options: BaseExceptionOptions;

  constructor(
    message: string | Record<string, any>,
    status = 500,
    options: BaseExceptionOptions = {},
  ) {
    super(message, status);
    this.options = options;
  }
}
