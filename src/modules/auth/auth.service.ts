/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  findAll() {
    return 'ok';
  }
}
