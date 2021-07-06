import { singleton } from 'tsyringe';
import { connect, Stan } from 'node-nats-streaming';
import { PubSubClientContract } from '@/contract';
import { ConfigHelper } from '../helpers';

@singleton()
export class PubSubClient implements PubSubClientContract {
  private stan?: Stan;

  constructor(private configHelper: ConfigHelper) {}

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

  async publish<T = any>(subject: string, data: T): Promise<void> {
    const stringData = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      this.getStan().publish(subject, stringData, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
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
