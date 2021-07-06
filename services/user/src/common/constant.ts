export enum Token {
  Container = 'Container',
  Config = 'Config',
  Joi = 'Joi',
  PolicyDict = 'PolicyDict',
  AbilityFactory = 'AbilityFactory',
  EventEmitter = 'EventEmitter',
  PubSubClient = 'PubSubClient',
  ConfigHelper = 'ConfigHelper',
  JwtHelper = 'JwtHelper',
  CryptHelper = 'CryptHelper',
  UserRepostory = 'UserRepostory',
}

export const Regex = {
  ObjectId: /^[0-9a-fA-F]{24}$/,
};

export enum Cookie {
  Token = 'token',
}

export enum PolicyAction {
  ViewAny = 'viewAny',
  View = 'view',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export enum PubSubSubject {
  UserCreated = 'UserCreated',
  UserUpdated = 'UserUpdated',
  UserDeleted = 'UserDeleted',
}

export enum Event {
  UserCreated = 'UserCreated',
  UserUpdated = 'UserUpdated',
  UserDeleted = 'UserDeleted',
}

export enum Env {
  Development = 'development',
  Production = 'production',
}

export type RequestPayloadSource = 'body' | 'params' | 'query';
