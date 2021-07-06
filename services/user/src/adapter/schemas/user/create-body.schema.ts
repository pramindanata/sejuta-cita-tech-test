import { Request } from 'express';
import Joi from 'joi';
import { RequestPayloadSchema } from '@/common';

export class UserCreateBodySchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      username: joi.string().required().token(),
      password: joi.string().required().min(8),
    });
  }
}
