import { singleton } from 'tsyringe';
import { Message } from 'node-nats-streaming';
import { PubSubSubscriber, UserDeletedMessageData } from '@/common';
import { UserUseCase } from '@/domain';
import { NotFoundException } from '../exception';

@singleton()
export class UserDeletedSubscriber implements PubSubSubscriber {
  constructor(private userUseCase: UserUseCase) {}

  async handle(data: UserDeletedMessageData, message: Message): Promise<void> {
    const user = await this.userUseCase.getDetail(data.id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.userUseCase.delete(user);

    message.ack();
  }
}
