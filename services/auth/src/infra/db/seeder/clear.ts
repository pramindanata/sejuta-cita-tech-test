import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';
import path from 'path';

const srcPath = path.join(__dirname, '../../..');

dotenv.config();
moduleAlias.addAlias('@', srcPath);

import Mongoose from 'mongoose';
import { Token } from '@/common';
import { container } from '@/infra';
import { ConfigHelperContract } from '@/contract';
import { Seeder } from './seeder';

async function clear() {
  const configHelper = container.resolve<ConfigHelperContract>(
    Token.ConfigHelper,
  );
  const dbHost = configHelper.get('db.host');
  const mongoose = await Mongoose.connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const seeder = new Seeder(mongoose.connection);

  await seeder.clear();
}

console.log('[~] Start cleaning process');

clear()
  .then(() => {
    console.log('[~] Cleaning process complete');

    process.exit(0);
  })
  .catch((err) => {
    console.error(err);

    process.exit(1);
  });
