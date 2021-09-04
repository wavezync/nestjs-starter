import { ApiException } from './api.exception';
import { HttpStatus } from '@nestjs/common';
export class UserNotFoundException extends ApiException {
  constructor() {
    super('User account does not exists', HttpStatus.UNAUTHORIZED);
  }
}
