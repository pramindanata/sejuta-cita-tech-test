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
  UserIndexQuerySchema,
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

  server.use(m(ExceptionHandler));

  return server;
}
