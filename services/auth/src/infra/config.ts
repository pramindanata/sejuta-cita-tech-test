import { Config, Env } from '@/common';

export function createConfig(): Config {
  const { env } = process;

  return {
    app: {
      env: (env.NODE_ENV as Env) || Env.Development,
      host: env.APP_HOST || 'localhost',
      port: (env.APP_PORT && parseInt(env.APP_PORT)) || 4001,
      secret: env.APP_SECRET || 'my_secret_123',
    },
    db: {
      host: env.DB_HOST || 'mongodb://localhost:27017/auth',
    },
  };
}
