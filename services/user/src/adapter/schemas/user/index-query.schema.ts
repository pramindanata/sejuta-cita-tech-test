import { Request } from 'express';
import Joi from 'joi';
import { RequestPayloadSchema } from '@/common';

export class UserIndexQuerySchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      limit: joi.number().optional().min(8).max(16).default(8),
      page: joi.number().optional().min(1).default(1),
    });
  }
}
