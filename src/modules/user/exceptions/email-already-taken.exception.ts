import { BaseException } from 'common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'common/errors/error-codes';

export class EmailAlreadyTakenException extends BaseException {
  constructor(email: string) {
    super(`${email} already in use`, HttpStatus.CONFLICT, {
      errorCode: ErrorCodes.EmailAlreadyInUseError,
    });
  }
}
