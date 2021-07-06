import { Request, RequestHandler } from 'express';
import Joi, { ValidationError, ValidationResult } from 'joi';
import { DependencyContainer, inject, singleton } from 'tsyringe';
import {
  Ctor,
  MiddlewareFactory,
  RequestPayloadSchema,
  RequestPayloadSource,
  Token,
} from '@/common';
import { UnprocessableEntityException } from '../exception';

@singleton()
export class SchemaValidator implements MiddlewareFactory {
  constructor(
    @inject(Token.Joi)
    private joi: Joi.Root,

    @inject(Token.Container)
    private container: DependencyContainer,
  ) {}

  create(options: ValidatorOptions): RequestHandler {
    const { body, params, query } = options;
    const paramsSchema = params && this.container.resolve(params);
    const querySchema = query && this.container.resolve(query);
    const bodySchema = body && this.container.resolve(body);

    return async (req, res, next) => {
      if (paramsSchema) {
        const schema = paramsSchema;
        const payload = req.params;
        const result = await this.validate(req, schema, payload, 'params');

        req.params = result.value;
      }

      if (querySchema) {
        const schema = querySchema;
        const payload = req.query;
        const result = await this.validate(req, schema, payload, 'query');

        req.query = result.value;
      }

      if (bodySchema) {
        const schema = bodySchema;
        const payload = req.body;
        const result = await this.validate(req, schema, payload, 'body');

        req.body = result.value;
      }

      next();
    };
  }

  private async validate(
    req: Request,
    schema: RequestPayloadSchema,
    payload: any,
    source: RequestPayloadSource,
  ): Promise<ValidationResult> {
    const objectSchema = await schema.get(req, this.joi);
    const result = objectSchema.validate(payload);

    if (result.error) {
      const data = this.getInvalidData(result.error);

      throw new UnprocessableEntityException({
        invalid: data,
        source,
      });
    }

    return result;
  }

  private getInvalidData(error: ValidationError): SchemaValidationInvalidData {
    const data: SchemaValidationInvalidData = error.details.reduce(
      (prev, cur) => {
        const key = cur.path.join('.');

        if (!prev[key]) {
          prev[key] = [];
        }

        prev[key].push({
          message: cur.message,
          context: cur.context,
        });

        return prev;
      },
      {} as SchemaValidationInvalidData,
    );

    return data;
  }
}

interface SchemaValidationInvalidData {
  [key: string]: {
    message: string;
    context: any;
  }[];
}

interface ValidatorOptions {
  body?: Ctor<RequestPayloadSchema>;
  params?: Ctor<RequestPayloadSchema>;
  query?: Ctor<RequestPayloadSchema>;
}
