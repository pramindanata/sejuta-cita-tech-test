export enum Token {
  Container = 'Container',
  Config = 'Config',
  Joi = 'Joi',
  PolicyDict = 'PolicyDict',
  AbilityFactory = 'AbilityFactory',
  ConfigHelper = 'ConfigHelper',
  JwtHelper = 'JwtHelper',
  CryptHelper = 'CryptHelper',
  UserRepository = 'UserRepository',
  PostRepository = 'PostRepository',
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
