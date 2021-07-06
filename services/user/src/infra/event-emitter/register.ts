import { Event } from '@/common';
import {
  UserCreatedListener,
  UserDeletedListener,
  UserUpdatedListener,
} from '@/adapter';
import { EventEmitter } from './event-emitter';
import { wrapListener as w } from './util';

export function registerListeners(eventEmitter: EventEmitter): void {
  eventEmitter.on(Event.UserCreated, w(UserCreatedListener));
  eventEmitter.on(Event.UserUpdated, w(UserUpdatedListener));
  eventEmitter.on(Event.UserDeleted, w(UserDeletedListener));
}
