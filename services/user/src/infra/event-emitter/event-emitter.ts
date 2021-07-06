import BaseEventEmitter from 'events';
import { singleton } from 'tsyringe';
import { EventListener } from '@/common';
import { EventEmitterContract } from '@/contract';

@singleton()
export class EventEmitter implements EventEmitterContract {
  private baseEventEmitter: BaseEventEmitter;
  private eventListenerDict: EventListenerDict = {};

  constructor() {
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

      this.baseEventEmitter.on(event, handler.handle.bind(handler));
    }
  }
}

interface EventListenerDict {
  [key: string]: EventListener;
}
