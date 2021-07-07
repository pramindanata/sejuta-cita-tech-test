import BaseEventEmitter from 'events';
import { singleton } from 'tsyringe';
import { EventListener, ExceptionContext } from '@/common';
import { EventEmitterContract } from '@/contract';
import { ExceptionHandler } from '../exception-handler';

@singleton()
export class EventEmitter implements EventEmitterContract {
  private baseEventEmitter: BaseEventEmitter;
  private eventListenerDict: EventListenerDict = {};

  constructor(private exceptionHandler: ExceptionHandler) {
    this.baseEventEmitter = new BaseEventEmitter();
  }

  emit(event: string, payload: unknown): void {
    this.baseEventEmitter.emit(event, payload);
  }

  on(event: string, handler: EventListener): void {
    this.eventListenerDict[event] = handler;
  }

  loadListeners(): void {
    for (const event in this.eventListenerDict) {
      const handler = this.eventListenerDict[event];

      this.baseEventEmitter.on(event, (data) => {
        handler.handle(data).catch((err) => {
          const ctx = new ExceptionContext('event-emitter', undefined);

          return this.exceptionHandler.handle(err, ctx);
        });
      });
    }
  }
}

interface EventListenerDict {
  [key: string]: EventListener;
}
