import { EventListenerDataDict } from '@/common';

export interface EventEmitterContract<T = EventListenerDataDict> {
  emit<K extends keyof T>(event: K, data: T[K]): void;
}
