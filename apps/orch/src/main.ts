/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import helmet from 'helmet';

import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppService } from './app/app.service';
import { AllExceptionFilter, LoggerService } from '@getfit/infra';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get<AppService>(AppService);

  app.enableCors();
  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req.headers.authorization?.split(' ')[1];
      if (authToken) {
        const user = await appService.checkToken(authToken);

        req.headers['user'] = JSON.stringify(user);
      }

      next();
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: error.message || 'undefined' });
    }
  });

  app.use(
    '/user',
    createProxyMiddleware({
      target: process.env.USER_LOCAL_URL,
      changeOrigin: true,
      onProxyReq: async (clientRequest, req, res) => {
        try {
          const uuid = uuidv4();
          clientRequest.setHeader('request-code', uuid);
          clientRequest.setHeader('api-key', process.env.API_KEY);
          clientRequest.removeHeader('authorization');
        } catch (error) {
          res.status(error.status || 500).send(error);
        }
      },
    })
  );

  const port = process.env.ORCH_PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
