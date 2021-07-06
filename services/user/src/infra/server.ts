import express, { Express } from 'express';
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

  server.use(cookieParser());
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

  server.use(m(ExceptionHandler));

  return server;
}
