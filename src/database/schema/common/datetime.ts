import { ColumnType } from 'kysely';

export type CreatedAt = ColumnType<Date, Date | string | undefined, never>;
export type UpdatedAt = ColumnType<
  Date,
  Date | string | undefined,
  string | undefined
>;
