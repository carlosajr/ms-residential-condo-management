import { DataSource } from 'typeorm';

import logger from '@/shared/core/logger';

import ormConfig from './config/ormConfig';

export default async (): Promise<DataSource> => {
  const config = ormConfig;

  logger.info('Connecting to database...');
  return await config.initialize();
};
