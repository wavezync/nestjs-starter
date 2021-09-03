/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { UserModel } from './entities/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const BCRYPT_HASH_ROUNDS = 10;

@Injectable()
export class UserService {
  /**
   * Register a new user
   *
   * @param {CreateUserDto} createUser
   * @memberof UserService
   */
  async register(createUser: CreateUserDto) {
    const { email, password } = createUser;
    const prevUser = await UserModel.query()
      .where('email', email)
      .select('id')
      .first(); // take first element, or an empty array will return

    if (prevUser) {
      throw new ConflictException('Email already taken');
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_HASH_ROUNDS);

    await UserModel.query().insert({
      email,
      passwordHash,
    });
  }
}
