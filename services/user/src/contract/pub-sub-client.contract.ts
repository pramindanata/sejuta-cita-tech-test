import { PubSubPublisherDataDict } from '@/common';

export interface PubSubClientContract<T = PubSubPublisherDataDict> {
  publish<K extends keyof T>(subject: K, data: T[K]): Promise<void>;
}
