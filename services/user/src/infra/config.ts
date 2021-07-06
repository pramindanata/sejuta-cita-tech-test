import { Config, Env } from '@/common';

export function createConfig(): Config {
  const { env } = process;

  return {
    app: {
      name: env.APP_NAME || 'service_user',
      env: (env.NODE_ENV as Env) || Env.Development,
      host: env.APP_HOST || 'localhost',
      port: (env.APP_PORT && parseInt(env.APP_PORT)) || 4002,
      secret: env.APP_SECRET || 'my_secret_123',
    },
    db: {
      host: env.DB_HOST || 'mongodb://localhost:27002/user',
    },
    stan: {
      clusterId: env.STAN_CLUSTER_ID || 'sc-tech-test',
      clientId: env.STAN_CLIENT_ID || 'service-user',
      url: env.STAN_URL || 'http://localhost:4222',
    },
  };
}
