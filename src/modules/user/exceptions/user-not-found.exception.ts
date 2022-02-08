import { BaseException } from 'common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends BaseException {
  constructor() {
    super('User account does not exists', HttpStatus.UNAUTHORIZED);
  }
}
