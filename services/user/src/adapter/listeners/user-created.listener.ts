import { singleton } from 'tsyringe';
import { EventListener } from '@/common';

@singleton()
export class UserCreatedListener implements EventListener {
  async handle(data: unknown): Promise<void> {
    console.log(data);
  }
}
