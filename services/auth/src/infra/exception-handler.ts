import { JsonWebTokenError } from 'jsonwebtoken';
import { inject, singleton } from 'tsyringe';
import { BaseHTTPException, UnauthenticatedException } from '@/adapter';
import { BaseDomainException } from '@/domain';
import { Env, ExceptionContext, Token } from '@/common';
import { ConfigHelper } from './helpers';

@singleton()
export class ExceptionHandler {
  constructor(
    @inject(Token.ConfigHelper)
    private configHelper: ConfigHelper,
  ) {}

  handle(err: Error, ctx: ExceptionContext): any {
    const type = ctx.getType();

    if (type === 'http') {
      return this.handleHttpException(err, ctx);
    }

    if (type === 'pubsub' || type === 'event-emitter') {
      console.error(err);
    }
  }

  private handleHttpException(err: Error, ctx: ExceptionContext): any {
    const { res } = ctx.getHttpContext();
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

    if (err instanceof JsonWebTokenError) {
      const exception = new UnauthenticatedException();

      return res.status(exception.getCode()).json(exception.getBody());
    }

    if (env === Env.Production) {
      console.error(err);

      return res.status(500).json(err.message);
    }
  }
}
