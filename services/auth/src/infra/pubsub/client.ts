import { singleton } from 'tsyringe';
import {
  Message,
  connect,
  Stan,
  SubscriptionOptions,
} from 'node-nats-streaming';
import { ExceptionContext, PubSubSubscriber } from '@/common';
import { ConfigHelper } from '../helpers';
import { ExceptionHandler } from '../exception-handler';

@singleton()
export class PubSubClient {
  private subscriberDict: SubscriberDict = {};
  private queueGroupName: string;
  private stan?: Stan;

  constructor(
    private configHelper: ConfigHelper,
    private exceptionHandler: ExceptionHandler,
  ) {
    this.queueGroupName = this.configHelper.get('app.name');
  }

  async connect(): Promise<void> {
    const clusterId = this.configHelper.get('stan.clusterId');
    const clientId = this.configHelper.get('stan.clientId');
    const url = this.configHelper.get('stan.url');

    return new Promise((resolve, reject) => {
      const stan = connect(clusterId, clientId, { url });

      stan.on('connect', () => {
        this.stan = stan;

        return resolve();
      });

      stan.on('error', (err) => {
        return reject(err);
      });
    });
  }

  subscribe(subject: string, handler: PubSubSubscriber): void {
    this.subscriberDict[subject] = handler;
  }

  loadSubscribers(): void {
    for (const subject in this.subscriberDict) {
      const handler = this.subscriberDict[subject];
      const options = this.getSubscriptionOptions();
      const subcription = this.getStan().subscribe(
        subject,
        this.queueGroupName,
        options,
      );

      subcription.on('message', (message: Message) => {
        const data = this.parseData(message.getData());

        handler.handle(data, message).catch((err) => {
          const ctx = new ExceptionContext('pubsub', undefined);

          return this.exceptionHandler.handle(err, ctx);
        });
      });
    }
  }

  private getSubscriptionOptions(): SubscriptionOptions {
    const ackWait = 5 * 1000;

    return this.getStan()
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(ackWait)
      .setDurableName(this.queueGroupName);
  }

  private getStan(): Stan {
    if (!this.stan) {
      throw new Error('NATS Streaming is not connected');
    }

    return this.stan;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private parseData(data: String | Buffer): any {
    return JSON.parse(data.toString('utf-8'));
  }
}

type SubscriberDict = {
  [key: string]: PubSubSubscriber;
};
