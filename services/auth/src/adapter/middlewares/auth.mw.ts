import { RequestHandler } from 'express';
import { singleton } from 'tsyringe';
import { MiddlewareFactory } from '@/common';
import { UnauthenticatedException } from '../exception';

@singleton()
export class Auth implements MiddlewareFactory {
  create(): RequestHandler {
    return (req, res, next) => {
      if (req.ctx.user) {
        return next();
      }

      throw new UnauthenticatedException();
    };
  }
}
