import { container } from 'tsyringe';
import { DataSource } from 'typeorm';

import AppDataSource from '@/shared/providers/typeorm';
import { registerRepositoriesProviders } from './respositories';
import { IRedisClient, REDIS_CLIENT } from '../providers/redis/IRedisClient';
import { RedisClient } from '../providers/redis/infra/RedisClient';

export async function registerSharedProviders(): Promise<void> {
  const dataSource: DataSource = await AppDataSource();

  container.registerInstance<DataSource>('DataSource', dataSource);

  container.registerSingleton<IRedisClient>(REDIS_CLIENT, RedisClient);

  await registerRepositoriesProviders();
}
