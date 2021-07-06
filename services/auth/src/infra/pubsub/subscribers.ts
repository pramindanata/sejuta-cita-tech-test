import { UserCreatedSubscriber } from '@/adapter';
import { PubSubSubject as Subject } from '@/common';
import { PubSubClient } from './client';
import { wrapSubscriber as w } from './util';

export function registerSubscribers(client: PubSubClient): void {
  client.subscribe(Subject.UserCreated, w(UserCreatedSubscriber));
}
