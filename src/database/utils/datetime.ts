export const withTimestamps = <T>(
  data: T,
  {
    createdAt = true,
    updatedAt = true,
  }: { createdAt?: boolean; updatedAt?: boolean } = {},
): T & { created_at: number; updated_at: number } => {
  const now = +new Date();

  return {
    ...data,
    ...(createdAt ? { created_at: now } : {}),
    ...(updatedAt ? { updated_at: now } : {}),
  } as T & { created_at: number; updated_at: number };
};

export type UpdateWithoutTimestamps<T> = Omit<T, 'updated_at'>;
export type NewWithoutTimestamps<T> = Omit<T, 'created_at' | 'updated_at'>;
