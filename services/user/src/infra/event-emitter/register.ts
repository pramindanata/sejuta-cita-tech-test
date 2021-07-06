import { UserCreatedListener } from '@/adapter';
import { Event } from '@/common';
import { EventEmitter } from './event-emitter';
import { wrapListener as w } from './util';

export function registerListeners(eventEmitter: EventEmitter): void {
  eventEmitter.on(Event.UserCreated, w(UserCreatedListener));
}
