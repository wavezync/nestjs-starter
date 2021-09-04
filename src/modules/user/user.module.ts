/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService], // inhject to use within the module
  exports: [UserService], // we export here to use with AuthService
})
export class UserModule {}
