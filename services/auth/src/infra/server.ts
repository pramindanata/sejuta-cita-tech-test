import express, { Express } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  AuthController,
  ExceptionHandler,
  LoginSchema,
  RequestContext,
  SchemaValidator,
} from '@/adapter';
import { wrapMiddleware as m, wrapController as c } from './server-util';

export function createServer(): Express {
  const server = express();
  const logger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
  );

  server.set('trust proxy', true);
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(logger);

  server.use(m(RequestContext));

  server.post(
    '/login',
    m(SchemaValidator, { body: LoginSchema }),
    c(AuthController, 'login'),
  );

  server.post('/token/refresh', c(AuthController, 'refresh'));

  server.post('/logout', c(AuthController, 'logout'));

  server.use(m(ExceptionHandler));

  return server;
}
