import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'common/errors/error-codes';

export class UnknownErrorException extends BaseException {
  constructor() {
    super('Unknown error occured', HttpStatus.INTERNAL_SERVER_ERROR, {
      errorCode: ErrorCodes.UnknownError,
    });
  }
}
