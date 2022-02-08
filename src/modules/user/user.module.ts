import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver], // inhject to use within the module
  exports: [UserService], // we export here to use with AuthService
})
export class UserModule {}
