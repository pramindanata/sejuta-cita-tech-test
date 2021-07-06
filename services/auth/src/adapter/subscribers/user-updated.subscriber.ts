import { singleton } from 'tsyringe';
import { Message } from 'node-nats-streaming';
import { PubSubSubscriber, UserUpdatedMessageData } from '@/common';
import { UserUseCase } from '@/domain';
import { NotFoundException } from '../exception';

@singleton()
export class UserUpdatedSubscriber implements PubSubSubscriber {
  constructor(private userUseCase: UserUseCase) {}

  async handle(data: UserUpdatedMessageData, message: Message): Promise<void> {
    const user = await this.userUseCase.getDetail(data.id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.userUseCase.update(user, {
      ...data,
      updatedAt: new Date(data.updatedAt),
    });

    message.ack();
  }
}
