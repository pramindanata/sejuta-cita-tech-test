import { ConfigKey } from '@/common';

export interface ConfigHelperContract<
  KeyDict extends Record<string, any> = ConfigKey,
> {
  get<K extends keyof KeyDict>(key: K): KeyDict[K];
}
