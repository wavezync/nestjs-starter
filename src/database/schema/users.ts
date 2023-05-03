import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type SelectableUser = Selectable<UserTable>;
export type InsertableUser = Insertable<UserTable>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type UpdatableUser = Updateable<UserTable>;

export interface UserTable {
  id: Generated<string>;
  name: string;
  email: string;
  passwordHash: string;
  verified: boolean;
  createdAt: ColumnType<Date, Date | string | undefined, never>;
  updatedAt: ColumnType<Date, Date | string | undefined, string | undefined>;
}
