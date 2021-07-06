export enum Token {
  Container = 'Container',
  Config = 'Config',
  Joi = 'Joi',
  ConfigHelper = 'ConfigHelper',
  JwtHelper = 'JwtHelper',
  CryptHelper = 'CryptHelper',
  UserRepository = 'UserRepository',
}

export enum PubSubSubject {
  UserCreated = 'UserCreated',
  UserUpdated = 'UserUpdated',
  UserDeleted = 'UserDeleted',
}

export const Regex = {
  Number: /^\d+$/,
};

export enum Cookie {
  Token = 'token',
}

export enum Env {
  Development = 'development',
  Production = 'production',
}

export type RequestPayloadSource = 'body' | 'params' | 'query';
