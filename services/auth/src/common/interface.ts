import Joi from 'joi';
import {
  ErrorRequestHandler,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';
import { Message } from 'node-nats-streaming';
import { User } from '@/domain';
import { Env } from './constant';

export type Ctor<T = Record<string, any>> = new (...args: any[]) => T;
export type ReqQuery<T> = T & qs.ParsedQs;
export type ReqParams<T> = T & {
  [key: string]: string;
};

export interface Config {
  app: {
    name: string;
    env: Env;
    host: string;
    port: number;
    secret: string;
  };
  db: {
    host: string;
  };
  jwt: {
    expDurationInSecond: number;
    refExpDurationInSecond: number;
  };
  stan: {
    clientId: string;
    clusterId: string;
    url: string;
  };
}

export interface ConfigKey {
  'app.name': string;
  'app.host': string;
  'app.env': Env;
  'app.port': number;
  'app.secret': string;
  'db.host': string;
  'jwt.expDurationInSecond': number;
  'jwt.refExpDurationInSecond': number;
  'stan.clientId': string;
  'stan.clusterId': string;
  'stan.url': string;
}

export type ExceptionContextType = 'http' | 'pubsub' | 'event-emitter';
export type ExceptionContextTypeContext = ExceptionHttpContext | undefined;
export interface ExceptionHttpContext {
  req: Request;
  res: Response;
  next: NextFunction;
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

export interface PubSubSubscriber {
  handle(data: any, message: Message): Promise<void>;
}

export interface UserCreatedMessageData {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type UserUpdatedMessageData = UserCreatedMessageData;
export type UserDeletedMessageData = UserCreatedMessageData;
