import pino from 'pino';

import { openSearchClient } from '../../providers/opensearch/OpenSearchClient';
import { getTracer } from '../tracer';
import { LogMeta } from './types';

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  },
  hooks: {
    logMethod(inputArgs: any[], method) {
      const tracerData = getTracer();

      const meta: LogMeta =
        typeof inputArgs[0] === 'object' && inputArgs[0] !== null
          ? inputArgs[0]
          : { message: inputArgs[0] };

      if (tracerData) {
        meta.tracer = {
          transactionId: tracerData.get('transactionId'),
          platform: tracerData.get('platform'),
          platformVersion: tracerData.get('platformVersion'),
          sessionId: tracerData.get('sessionId'),
          ip: tracerData.get('ip'),
        };
      }

      const indexName =
        `${process.env.APPLICATION}-${process.env.ACRONYM_ENVIRONMENT}-LOGS`.toLowerCase();

      openSearchClient
        .index({
          index: indexName,
          body: {
            timestamp: new Date(),
            level: meta.level || 'info',
            message: meta.message || 'no-message',
            ...meta,
          },
        })
        .catch(error => {
          /* eslint-disable no-console */
          console.error('❌ OpenSearch insert error:', error.meta?.body || error.message);
        });

      method.apply(this, [JSON.stringify(meta)]);
    },
  },
});

export default logger;
