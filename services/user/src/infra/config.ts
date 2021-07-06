import { Config, Env } from '@/common';

export function createConfig(): Config {
  const { env } = process;

  return {
    app: {
      env: (env.NODE_ENV as Env) || Env.Development,
      host: env.APP_HOST || 'localhost',
      port: (env.APP_PORT && parseInt(env.APP_PORT)) || 4000,
      secret: env.APP_SECRET || 'my_secret_123',
    },
    db: {
      host: env.DB_HOST || 'localhost',
      port: (env.DB_PORT && parseInt(env.DB_PORT)) || 5432,
      name: env.DB_NAME || 'clean_starterkit',
      user: env.DB_USER || 'postgres',
      password: env.DB_PASSWORD || '',
    },
  };
}
