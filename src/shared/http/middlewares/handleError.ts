import { NextFunction, Request, Response } from 'express';

import { AppError } from '@/shared/core/errors/AppError';
import logger from '@/shared/core/logger';

export function handleError(err: Error, req: Request, res: Response, _next: NextFunction): void {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const errorType = isAppError ? err.type : 'unknown';

  logger.fatal({
    err,
  });

  logger.error({
    message: err.message || 'Erro interno no servidor',
    route: req.originalUrl,
    method: req.method,
    type: errorType,
    statusCode,
    request: {
      body: req.body,
      query: req.query,
      params: req.params,
    },
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });

  res.status(statusCode).json({
    status: 'error',
    message: isAppError ? err.message : 'Erro interno no servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // opcional
  });
}
