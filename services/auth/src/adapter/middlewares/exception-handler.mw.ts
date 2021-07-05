import { inject, singleton } from 'tsyringe';
import { ErrorRequestHandler } from 'express';
import { BaseDomainException } from '@/domain';
import { Env, ExceptionMiddlewareFactory, Token } from '@/common';
import { BaseHTTPException } from '../exception';
import { ConfigHelperContract } from '@/contract';

@singleton()
export class ExceptionHandler implements ExceptionMiddlewareFactory {
  constructor(
    @inject(Token.ConfigHelper)
    private configHelper: ConfigHelperContract,
  ) {}

  create(): ErrorRequestHandler {
    return (err, req, res, next) => {
      const env = this.configHelper.get('app.env');

      if (err instanceof BaseDomainException) {
        return res.status(403).json({
          domain: true,
          name: err.constructor.name,
          message: err.message,
        });
      }

      if (err instanceof BaseHTTPException) {
        return res.status(err.getCode()).json(err.getBody());
      }

      if (env === Env.Production) {
        console.error(err);

        return res.status(500).json(err.message);
      }

      return next(err);
    };
  }
}
