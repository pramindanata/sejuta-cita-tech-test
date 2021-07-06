import { Request } from 'express';
import Joi from 'joi';
import { RequestPayloadSchema } from '@/common';

export class PostUpdateBodySchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      title: joi.string().required(),
      content: joi.string().required(),
    });
  }
}
