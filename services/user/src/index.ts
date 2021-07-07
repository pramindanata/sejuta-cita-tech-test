import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@', __dirname);

import { bootstrap } from '@/infra';

bootstrap().catch((err) => {
  console.error(err);

  process.exit(1);
});
