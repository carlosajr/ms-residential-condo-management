import { createClient, RedisClientType, SetOptions } from 'redis';
import { singleton } from 'tsyringe';
import { IRedisClient } from '../IRedisClient';
import logger from '@/shared/core/logger';

@singleton()
export class RedisClient implements IRedisClient {
  private client: RedisClientType;
  private ready = false;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_HOST || 'localhost',
      password: process.env.REDIS_PASSWORD || undefined,
      socket: {
        reconnectStrategy: retries => {
          const delay = Math.min(retries * 250, 4000);
          return delay;
        },
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    this.client
      .on('ready', () => {
        logger.info(`✅ Redis is ready`);
        this.ready = true;
      })
      .on('reconnecting', () => (this.ready = false))
      .on('end', () => (this.ready = false))
      .on('error', err => {
        console.error('[Redis] connection error:', err);
      });
  }

  async init(): Promise<void> {
    logger.info(`Connecting Redis...`);
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  isReady(): boolean {
    return this.ready;
  }

  async get(key: string): Promise<string | null> {
    if (!this.ready) return null;
    return this.client.get(key);
  }

  async set(key: string, value: string, options?: SetOptions): Promise<string | null> {
    if (!this.ready) return null;
    return this.client.set(key, value, options);
  }

  async del(key: string | string[]): Promise<number> {
    if (!this.ready) return 0;
    return this.client.del(key);
  }

  async deleteCacheByPattern(pattern: string): Promise<number> {
    if (!this.ready) return 0;

    const BATCH_SIZE = 100;
    let buffer: string[] = [];
    let deleted = 0;

    for await (const keys of this.client.scanIterator({
      MATCH: pattern,
      COUNT: BATCH_SIZE,
    })) {
      buffer.push(...keys);

      if (buffer.length >= BATCH_SIZE) {
        deleted += await this.client.del(buffer);
        buffer = [];
      }
    }

    if (buffer.length) {
      deleted += await this.client.del(buffer);
    }

    return deleted;
  }

  async setJson<T = unknown>(key: string, value: T, options?: SetOptions): Promise<string | null> {
    return this.set(key, JSON.stringify(value), options);
  }

  async getJson<T = unknown>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`[Redis] Failed to parse JSON for key "${key}"`);
      return null;
    }
  }
}
