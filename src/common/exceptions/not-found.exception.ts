import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'common/errors/error-codes';

export class NotFoundException extends BaseException {
  constructor(resource: string | number) {
    super(`${resource} not found`, HttpStatus.NOT_FOUND, {
      errorCode: ErrorCodes.NotFoundError,
    });
  }
}
