import { SetOptions } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export interface IRedisClient {
  init(): Promise<void>;

  isReady(): boolean;

  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: SetOptions): Promise<string | null>;

  del(key: string | string[]): Promise<number>;

  deleteCacheByPattern(pattern: string): Promise<number>;

  setJson<T = unknown>(key: string, value: T, options?: SetOptions): Promise<string | null>;
  getJson<T = unknown>(key: string): Promise<T | null>;
}
