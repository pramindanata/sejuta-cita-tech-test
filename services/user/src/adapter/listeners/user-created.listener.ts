import { inject, singleton } from 'tsyringe';
import { EventListener, PubSubSubject, Token } from '@/common';
import { User } from '@/domain';
import { PubSubClientContract } from '@/contract';
import { UserMessageDto } from '../dto';

@singleton()
export class UserCreatedListener implements EventListener {
  constructor(
    @inject(Token.PubSubClient)
    private pubSubClient: PubSubClientContract,
  ) {}

  async handle(user: User): Promise<void> {
    const dataToPublish = UserMessageDto.fromDomain(user);

    await this.pubSubClient.publish(PubSubSubject.UserCreated, dataToPublish);
  }
}
