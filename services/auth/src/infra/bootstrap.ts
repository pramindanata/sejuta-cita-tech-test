import mongoose from 'mongoose';
import { ConfigHelper } from './helpers';
import { container } from './provider';
import { PubSubClient, registerSubscribers } from './pubsub';
import { createServer } from './server';

export async function bootstrap(): Promise<void> {
  const configHelper = container.resolve(ConfigHelper);
  const pubsubClient = container.resolve(PubSubClient);
  const dbHost = configHelper.get('db.host');

  await mongoose.connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  await pubsubClient.connect();
  registerSubscribers(pubsubClient);
  pubsubClient.loadSubscribers();

  const server = createServer();
  const port = configHelper.get('app.port');

  server.listen(port, () => {
    console.log(`[~] Server is listening on port ${port}`);
  });
}
