import { ErrorRequestHandler, RequestHandler } from 'express';
import { Ctor, MiddlewareFactory, ExceptionMiddlewareFactory } from '@/common';
import { container } from './provider';

export function wrapController<
  C extends Record<string, any>,
  K extends keyof C,
>(ctor: Ctor<C>, key: K): C[K] {
  const controller = container.resolve(ctor);
  const method = controller[key];

  return method.bind(controller);
}

export function wrapMiddleware<
  M extends MiddlewareFactory | ExceptionMiddlewareFactory,
>(
  ctor: Ctor<M>,
  ...args: Parameters<M['create']>
): RequestHandler | ErrorRequestHandler {
  const factory = container.resolve(ctor);

  return factory.create(...args);
}
