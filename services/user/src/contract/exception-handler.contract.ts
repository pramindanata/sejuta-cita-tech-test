import { ExceptionContext } from '@/common';

export interface ExceptionHandlerContract {
  handle(err: Error, ctx: ExceptionContext): any;
}
