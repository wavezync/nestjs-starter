import { BaseException } from 'common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../../../common/errors/error-codes';

export class UserNotFoundException extends BaseException {
  constructor() {
    super('User account does not exists', HttpStatus.UNAUTHORIZED, {
      errorCode: ErrorCodes.UserAccountNotFoundError,
    });
  }
}
