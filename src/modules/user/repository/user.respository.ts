import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';
import { DB } from 'database/schema/db';
import { SelectableUser, InsertableUser } from 'database/schema/users';
import { Kysely, SelectExpression, Selection } from 'kysely';
import { v4 as uuid } from 'uuid';

type UserWithoutPassword = Omit<SelectableUser, 'passwordHash'>;
type DefaultUserFields = keyof UserWithoutPassword;
type UsersSelectionExpression = SelectExpression<DB, 'users'>;

const DEFAULT_USER_SELECT_FIELDS = [
  'id',
  'email',
  'name',
  'createdAt',
  'updatedAt',
  'verified',
] satisfies DefaultUserFields[];

@Injectable()
export class UserRepositoy {
  private readonly db: Kysely<DB>;
  constructor(private readonly dbService: DatabaseService) {
    this.db = this.dbService.getDB();
  }

  async createUser(
    createUserInput: InsertableUser,
  ): Promise<UserWithoutPassword> {
    const id = uuid();
    const now = new Date();

    const insertable: InsertableUser = {
      id,
      createdAt: now,
      updatedAt: now,
      ...createUserInput,
    };

    const user = await this.db
      .insertInto('users')
      .values(insertable)
      .returning(['id', 'name', 'createdAt', 'updatedAt', 'email', 'verified'])
      .executeTakeFirst();
    return user;
  }

  async getUserByEmail<S extends UsersSelectionExpression = DefaultUserFields>(
    email: string,
    select: S | S[] = DEFAULT_USER_SELECT_FIELDS as S[],
  ): Promise<Selection<DB, 'users', S>> {
    const user = await this.db
      .selectFrom('users')
      .where('email', '=', email.toLowerCase())
      .select(select)
      .executeTakeFirst();
    return user;
  }

  async getUserById<S extends UsersSelectionExpression = DefaultUserFields>(
    id: string,
    select: S | S[] = DEFAULT_USER_SELECT_FIELDS as S[],
  ): Promise<Selection<DB, 'users', S>> {
    const user = await this.db
      .selectFrom('users')
      .where('id', '=', id)
      .select(select)
      .executeTakeFirst();
    return user;
  }

  async getUsersByIds<S extends UsersSelectionExpression = DefaultUserFields>(
    ids: string[],
    select: S | S[] = DEFAULT_USER_SELECT_FIELDS as S[],
  ) {
    const users = await this.db
      .selectFrom('users')
      .where('id', 'in', ids)
      .select(select)
      .execute();
    return users;
  }
}
