const env = process.env;
const rootDir = getRootDir();

function getRootDir() {
  const dev = 'development';

  if (env.NODE_ENV === dev) {
    return 'src';
  }

  return 'dist';
}

module.exports = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: (env.DB_PORT && parseInt(env.DB_PORT)) || 5432,
  database: env.DB_NAME || 'clean_starterkit',
  username: env.DB_USER || 'postgres',
  password: env.DB_PASSWORD || '',
  logging: ['error'],
  entities: [`./${rootDir}/infra/db/entities/*.entity{.ts,.js}`],
  migrations: ['./dist/infra/db/migrations/*.js'],
  seeds: [`./${rootDir}/infra/db/seeds/*{.ts,.js}`],
  factories: [`./${rootDir}/infra/db/factories/*{.ts,.js}`],
  cli: {
    migrationsDir: `./src/infra/db/migrations`,
  },
};
