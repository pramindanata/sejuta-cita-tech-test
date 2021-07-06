import { Request } from 'express';
import Joi from 'joi';
import { RequestPayloadSchema } from '@/common';

export class RegisterSchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      email: joi.string().required().email(),
      password: joi.string().required().min(8),
    });
  }
}
