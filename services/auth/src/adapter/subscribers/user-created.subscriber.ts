import { singleton } from 'tsyringe';
import { Message } from 'node-nats-streaming';
import { PubSubSubscriber } from '@/common';

@singleton()
export class UserCreatedSubscriber implements PubSubSubscriber {
  async handle(data: any, message: Message): Promise<void> {
    console.log(data);

    message.ack();
  }
}
