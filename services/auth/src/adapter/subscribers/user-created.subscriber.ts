import { singleton } from 'tsyringe';
import { Message } from 'node-nats-streaming';
import { PubSubSubscriber, UserCreatedMessageData } from '@/common';
import { UserRole, UserUseCase } from '@/domain';

@singleton()
export class UserCreatedSubscriber implements PubSubSubscriber {
  constructor(private userUseCase: UserUseCase) {}

  async handle(data: UserCreatedMessageData, message: Message): Promise<void> {
    await this.userUseCase.create({
      ...data,
      role: data.role === UserRole.Admin ? UserRole.Admin : UserRole.User,
    });

    message.ack();
  }
}
