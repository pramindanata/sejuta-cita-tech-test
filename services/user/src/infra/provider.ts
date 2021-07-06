import { container as baseContainer, instanceCachingFactory } from 'tsyringe';
import { AbilityFactory } from 'policy-authorization';
import joi from 'joi';
import { Token } from '@/common';
import { ConfigHelper, JwtHelper, CryptHelper } from './helpers';
import { createConfig } from './config';
import { UserRepository } from './db';

const container = baseContainer;

container.register(Token.Container, {
  useFactory: (c) => c,
});

container.register(Token.Config, {
  useValue: createConfig(),
});

container.register(Token.PolicyDict, {
  useValue: {},
});

container.register(Token.AbilityFactory, {
  useFactory: instanceCachingFactory((c) => {
    const policyDict: Record<string, any> = c.resolve(Token.PolicyDict);

    return new AbilityFactory(policyDict);
  }),
});

container.register(Token.ConfigHelper, {
  useFactory: (c) => c.resolve(ConfigHelper),
});

container.register(Token.JwtHelper, {
  useFactory: (c) => c.resolve(JwtHelper),
});

container.register(Token.CryptHelper, {
  useFactory: (c) => c.resolve(CryptHelper),
});

container.register(Token.UserRepostory, {
  useFactory: (c) => c.resolve(UserRepository),
});

container.register(Token.Joi, {
  useValue: joi.defaults((schema) =>
    schema.options({
      abortEarly: false,
      convert: true,
      stripUnknown: true,
      errors: {
        escapeHtml: true,
      },
    }),
  ),
});

export { container };
