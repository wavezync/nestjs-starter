import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';
import { DB } from 'database/schema/db';
import { UserCreate } from 'database/schema/users';
import { withTimestamps } from 'database/utils/datetime';
import { Kysely } from 'kysely';
import { getUUIDV4 } from 'utils/uuid';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepositoy {
  private readonly db: Kysely<DB>;
  constructor(private readonly dbService: DatabaseService) {
    this.db = this.dbService.getDB();
  }

  async createUser(createUserInput: UserCreate) {
    const id = getUUIDV4();

    const insertable: UserCreate = withTimestamps({
      id,
      ...createUserInput,
    });

    const result = await this.db
      .insertInto('users')
      .values(insertable)
      .returningAll()
      .executeTakeFirst();

    if (!result) {
      return null;
    }

    return new UserModel(result);
  }

  async getUserByEmail(email: string) {
    const result = await this.db
      .selectFrom('users')
      .where('email', '=', email.toLowerCase())
      .selectAll()
      .executeTakeFirst();

    if (!result) {
      return null;
    }

    return new UserModel(result);
  }

  async getUserById(id: string) {
    const result = await this.db
      .selectFrom('users')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!result) {
      return null;
    }

    return UserModel.fromResult(result);
  }

  async getUsersByIds(ids: string[]) {
    const users = await this.db
      .selectFrom('users')
      .where('id', 'in', ids)
      .selectAll()
      .execute();

    return users.map((user) => new UserModel(user));
  }
}
