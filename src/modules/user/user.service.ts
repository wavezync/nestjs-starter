import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { RegisterUserDto } from './dtos/register-user.dto';
import bcrypt from 'bcrypt';
import { UserObject } from './dtos/objects/user.object';
import { EmailAlreadyTakenException } from './exceptions/email-already-taken.exception';

const BCRYPT_HASH_ROUNDS = 10;

@Injectable()
export class UserService {
  /**
   * Register a new user
   *
   * @param {RegisterUserDto} registerUser
   * @memberof UserService
   */
  async registerUser(registerUser: RegisterUserDto) {
    const { email, password } = registerUser;

    // we are using Knex + Objection to query
    // it is closer to SQL
    // Objection https://vincit.github.io/objection.js/guide/query-examples.html#basic-queries
    // Knex https://knexjs.org/#Builder
    const prevUser = await User.query()
      .where('email', email.toLowerCase())
      .select('id')
      .first(); // take first element, or an empty array will return

    if (prevUser) {
      throw new EmailAlreadyTakenException(email);
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_HASH_ROUNDS);

    await User.query().insert({
      email,
      passwordHash,
      verified: true, // for now no emails
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await User.query().where('email', email.toLowerCase()).first();
    return user;
  }

  async findUserById(id: string): Promise<User | undefined> {
    const user = await User.query().where('id', id).first();
    return user;
  }

  async loadUsersByIdBatch(userIds: string[]): Promise<(Error | UserObject)[]> {
    const users = await User.query().whereIn('id', userIds);
    const userDtosMap = users.reduce<Map<string, UserObject>>(
      (result, user) => {
        result.set(user.id, user.toDto());
        return result;
      },
      new Map<string, UserObject>(),
    );

    return userIds.map(
      (userId) =>
        userDtosMap.get(userId) || new Error(`No user found for key ${userId}`),
    );
  }
}
