import { container as baseContainer, instanceCachingFactory } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { AbilityFactory } from 'policy-authorization';
import joi from 'joi';
import { Token } from '@/common';
import { Post, PostPolicy } from '@/domain';
import { PostRepository, UserRepository } from './db';
import { ConfigHelper, JwtHelper, CryptHelper } from './helpers';
import { createConfig } from './config';

const container = baseContainer;

container.register(Token.Container, {
  useFactory: (c) => c,
});

container.register(Token.Config, {
  useValue: createConfig(),
});

container.register(Token.PolicyDict, {
  useValue: {
    [Post.name]: PostPolicy,
  },
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

container.register(Token.UserRepository, {
  useFactory: () => getCustomRepository(UserRepository),
});

container.register(Token.PostRepository, {
  useFactory: () => getCustomRepository(PostRepository),
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
