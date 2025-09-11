import '@/shared/providers/typeorm';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import pino from 'pino-http';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';

import { loggerMiddleware } from '@/shared/http/middlewares/loggerMiddleware';
import { tracerMiddleware } from '@/shared/http/middlewares/tracerMiddleware';
import swaggerDocument from '@/shared/http/docs/swagger.json';
import { container } from 'tsyringe';
import { IRedisClient, REDIS_CLIENT } from '@/shared/providers/redis/IRedisClient';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupDocs();
    this.setupProviders();
  }

  private setupMiddlewares(): void {
    this.app.use(tracerMiddleware);
    this.app.use(loggerMiddleware);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(pino());
  }

  private setupDocs(): void {
    this.app.get('/docs/swagger.json', (req, res) => {
      if (swaggerDocument) {
        return res.json(swaggerDocument);
      } else {
        res.status(404).json({ error: 'Swagger file not found' });
      }
    });
    const options = {
      swaggerOptions: {
        url: '/docs/swagger.json',
      },
      swaggerUrls: [
        {
          url: '/docs/swagger.json',
          name: 'API PLATAFORMA MICROSERVICE DOCS',
          description: 'Documentação da API PLATAFORMA MICROSERVICE',
        },
      ],
      customSiteTitle: 'API PLATAFORMA MICROSERVICE DOCS',
    } as unknown as SwaggerUiOptions;
    this.app.use('/docs', swaggerUi.serve as any, swaggerUi.setup(swaggerDocument, options));
  }

  private async setupProviders(): Promise<void> {
    // const redis = container.resolve<IRedisClient>(REDIS_CLIENT);
    // await redis.init();
  }

  public getApp(): Application {
    return this.app;
  }
}
