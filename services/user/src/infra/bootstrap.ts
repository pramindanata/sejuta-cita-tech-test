import { createConnection } from 'typeorm';
import { ConfigHelper } from './helpers';
import { container } from './provider';
import { createServer } from './server';

export async function bootstrap(): Promise<void> {
  await createConnection();

  const server = createServer();
  const configHelper = container.resolve(ConfigHelper);
  const port = configHelper.get('app.port');

  server.listen(port, () => {
    console.log(`[~] Server is listening on port ${port}`);
  });
}
