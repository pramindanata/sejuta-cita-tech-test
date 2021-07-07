import { inject, singleton } from 'tsyringe';
import { ErrorRequestHandler } from 'express';
import { ExceptionContext, ExceptionMiddlewareFactory, Token } from '@/common';
import { ExceptionHandlerContract } from '@/contract';

@singleton()
export class Exception implements ExceptionMiddlewareFactory {
  constructor(
    @inject(Token.ExceptionHandler)
    private exceptionHandler: ExceptionHandlerContract,
  ) {}

  create(): ErrorRequestHandler {
    return (err, req, res, next) => {
      const ctx = new ExceptionContext('http', {
        req,
        res,
        next,
      });

      return this.exceptionHandler.handle(err, ctx);
    };
  }
}
