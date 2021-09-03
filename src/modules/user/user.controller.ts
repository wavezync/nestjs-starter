/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAll() {
    return 'ok';
  }
}
