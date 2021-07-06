import { RequestHandler } from 'express';
import { singleton } from 'tsyringe';
import { MiddlewareFactory } from '@/common';
import { UnauthorizedException } from '../exception';

@singleton()
export class Guest implements MiddlewareFactory {
  create(): RequestHandler {
    return (req, res, next) => {
      if (!req.ctx.user) {
        return next();
      }

      throw new UnauthorizedException();
    };
  }
}
