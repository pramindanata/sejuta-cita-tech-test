import { PubSubSubject as Subject } from '@/common';
import {
  UserCreatedSubscriber,
  UserDeletedSubscriber,
  UserUpdatedSubscriber,
} from '@/adapter';
import { PubSubClient } from './client';
import { wrapSubscriber as w } from './util';

export function registerSubscribers(client: PubSubClient): void {
  client.subscribe(Subject.UserCreated, w(UserCreatedSubscriber));
  client.subscribe(Subject.UserUpdated, w(UserUpdatedSubscriber));
  client.subscribe(Subject.UserDeleted, w(UserDeletedSubscriber));
}
