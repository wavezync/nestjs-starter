import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'common/exceptions/base.exception';
import { ErrorCodes } from '../../../common/errors/error-codes';

export class InvalidLoginOrPasswordException extends BaseException {
  constructor() {
    super('Invalid login or password', HttpStatus.UNAUTHORIZED, {
      errorCode: ErrorCodes.InvalidLoginOrPasswordError,
    });
  }
}
