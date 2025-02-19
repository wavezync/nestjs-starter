import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepositoy } from './repository/user.respository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver, UserRepositoy], // inhject to use within the module
  exports: [UserService, UserRepositoy], // we export here to use with AuthService
})
export class UserModule {}
