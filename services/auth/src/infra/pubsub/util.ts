import { Ctor, PubSubSubscriber } from '@/common';
import { container } from '../provider';

export function wrapSubscriber(ctor: Ctor<PubSubSubscriber>): PubSubSubscriber {
  const instance = container.resolve(ctor);

  return instance;
}
