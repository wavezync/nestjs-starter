export const withTimestamps = <T>(
  data: T,
  {
    createdAt = true,
    updatedAt = true,
  }: { createdAt?: boolean; updatedAt?: boolean } = {},
): T & { created_at: Date; updated_at: Date } => {
  const now = new Date();

  return {
    ...data,
    ...(createdAt ? { created_at: now } : {}),
    ...(updatedAt ? { updated_at: now } : {}),
  } as T & { created_at: Date; updated_at: Date };
};

export type UpdateWithoutTimestamps<T> = Omit<T, 'updated_at'>;
export type NewWithoutTimestamps<T> = Omit<T, 'created_at' | 'updated_at'>;
