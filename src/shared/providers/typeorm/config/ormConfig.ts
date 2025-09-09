import 'dotenv/config';

import path from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  extra: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
  logging: true,
  entities: [
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../../../../modules/**/entities/*.ts')
      : path.resolve(__dirname, '../../../../modules/**/entities/*.js'),
  ],
  migrations: [
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../migrations/*.ts')
      : path.resolve(__dirname, '../migrations/*.js'),
  ],
});
