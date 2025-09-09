import 'reflect-metadata';
import 'dotenv/config';

import { handleError } from '@/shared/http/middlewares/handleError';
import { registerSharedProviders } from '@/shared/container';
import logger from '@/shared/core/logger';
import { registerRoutes } from '@/shared/http/docs/decorators/routes-loader';
import { App } from './app';

export async function bootstrap() {
  await registerSharedProviders();
  const app = new App().getApp();
  await registerRoutes(app);
  app.use(handleError);
  const PORT = process.env.PORT || 3333;

  const server = app.listen(PORT, () => {
    logger.info(`🔥 Server is running at http://localhost:${PORT}`);
  });

  process.on('SIGINT', () => {
    logger.warn('🔌 Encerrando aplicação via SIGINT (Ctrl+C)...');
    shutdown(server);
  });

  process.on('SIGTERM', () => {
    logger.warn('🛑 Encerrando aplicação via SIGTERM...');
    shutdown(server);
  });

  process.on('uncaughtException', err => {
    logger.fatal({ err }, '💥 Exceção não capturada');
    process.exit(1);
  });

  process.on('unhandledRejection', reason => {
    logger.fatal({ reason }, '💥 Promessa rejeitada não tratada');
    process.exit(1);
  });
}

function shutdown(server: import('http').Server) {
  server.close(() => {
    logger.info('🧹 Servidor encerrado com sucesso.');
    process.exit(0);
  });
}
