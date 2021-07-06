import { Request } from 'express';
import Joi from 'joi';
import { Regex, RequestPayloadSchema } from '@/common';

export class UserShowParamsSchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      userId: joi.string().regex(Regex.ObjectId).required(),
    });
  }
}
