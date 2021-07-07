import express, { Express } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  Auth,
  ExceptionHandler,
  RequestContext,
  SchemaValidator,
  UserController,
  UserCreateBodySchema,
  UserIndexQuerySchema,
  UserShowParamsSchema,
} from '@/adapter';
import { wrapMiddleware as m, wrapController as c } from './server-util';

export function createServer(): Express {
  const server = express();
  const logger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
  );

  server.set('trust proxy', true);
  server.use(cookieParser());
  server.use(logger);
  server.use(bodyParser.json());
  server.use(m(RequestContext));

  server.get(
    '/users',
    m(Auth),
    m(SchemaValidator, { query: UserIndexQuerySchema }),
    c(UserController, 'index'),
  );

  server.get(
    '/users/:userId',
    m(Auth),
    m(SchemaValidator, { params: UserShowParamsSchema }),
    c(UserController, 'show'),
  );

  server.post(
    '/users',
    m(Auth),
    m(SchemaValidator, { body: UserCreateBodySchema }),
    c(UserController, 'create'),
  );

  server.put(
    '/users/:userId',
    m(Auth),
    m(SchemaValidator, {
      params: UserShowParamsSchema,
      body: UserCreateBodySchema,
    }),
    c(UserController, 'update'),
  );

  server.delete(
    '/users/:userId',
    m(Auth),
    m(SchemaValidator, {
      params: UserShowParamsSchema,
    }),
    c(UserController, 'delete'),
  );

  server.use(m(ExceptionHandler));

  return server;
}
