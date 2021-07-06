import { Ctor, EventListener } from '@/common';
import { container } from '../provider';

export function wrapListener(ctor: Ctor<EventListener>): EventListener {
  const instance = container.resolve(ctor);

  return instance;
}
