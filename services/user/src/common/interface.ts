import Joi from 'joi';
import { ErrorRequestHandler, Request, RequestHandler } from 'express';
import { Ability } from 'policy-authorization';
import { User } from '@/domain';
import { Env } from './constant';

export type Ctor<T = Record<string, any>> = new (...args: any[]) => T;
export type ReqQuery<T> = T & qs.ParsedQs;
export type ReqParams<T> = T & {
  [key: string]: string;
};

export interface Config {
  app: {
    env: Env;
    host: string;
    port: number;
    secret: string;
  };
  db: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
}

export interface ConfigKey {
  'app.host': string;
  'app.env': Env;
  'app.port': number;
  'app.secret': string;
  'db.host': string;
  'db.port': number;
  'db.name': string;
  'db.user': string;
  'db.password': string;
}

export interface Pagination<T = any> {
  data: T[];
  total: number;
}

export interface PaginationOptions {
  limit: number;
  page: number;
}

export interface RequestContext {
  user?: User;
  ability?: Ability;
}

export interface MiddlewareFactory {
  create(...args: any[]): RequestHandler;
}

export interface ExceptionMiddlewareFactory {
  create(...args: any[]): ErrorRequestHandler;
}

export interface RequestPayloadSchema {
  get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema>;
}
