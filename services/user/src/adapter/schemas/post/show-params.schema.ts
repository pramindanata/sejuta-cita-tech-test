import { Request } from 'express';
import Joi from 'joi';
import { Regex, RequestPayloadSchema } from '@/common';

export class PostShowParamsSchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      postId: joi.string().regex(Regex.Number).required(),
    });
  }
}
