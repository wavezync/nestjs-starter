/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../db/database.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
