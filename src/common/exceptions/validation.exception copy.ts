import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'common/errors/error-codes';

export class ValidationException extends BaseException {
  constructor(errors: any) {
    super('Validation Failed', HttpStatus.BAD_REQUEST, {
      errors,
      errorCode: ErrorCodes.ValidationError,
    });
  }
}
