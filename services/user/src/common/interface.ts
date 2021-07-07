import Joi from 'joi';
import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { Ability } from 'policy-authorization';
import { User } from '@/domain';
import { Env, Event, PubSubSubject } from './constant';

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
  ability?: Ability;
}

export interface UserMessageData {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface PubSubPublisherDataDict {
  [PubSubSubject.UserCreated]: UserMessageData;
  [PubSubSubject.UserUpdated]: UserMessageData;
  [PubSubSubject.UserDeleted]: UserMessageData;
}

export interface EventListenerDataDict {
  [Event.UserCreated]: User;
  [Event.UserUpdated]: User;
  [Event.UserDeleted]: User;
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

export interface EventListener {
  handle(data: any): Promise<void>;
}
