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
import { UserModel } from '../models';

async function seed() {
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

  await seeder.seed(UserModel, [
    {
      _id: '60e3caf96ef0ba2c50a61be3',
      username: 'pramindanata',
      password: '$2b$10$0hKs.64gPU1NPXGCIJg8u.m.rO4ZDTnMqxRZn3ffXOxGRbgNjsGyy',
      role: 'ADMIN',
      createdAt: '1625541369108',
      updatedAt: '1625541369108',
    },
    {
      _id: '60e3caf96ef0ba2c50a61be4',
      username: 'user-a',
      password: '$2b$10$0hKs.64gPU1NPXGCIJg8u.m.rO4ZDTnMqxRZn3ffXOxGRbgNjsGyy',
      role: 'USER',
      createdAt: '1625541369108',
      updatedAt: '1625541369108',
    },
    {
      _id: '60e3caf96ef0ba2c50a61be5',
      username: 'user-b',
      password: '$2b$10$0hKs.64gPU1NPXGCIJg8u.m.rO4ZDTnMqxRZn3ffXOxGRbgNjsGyy',
      role: 'USER',
      createdAt: '1625541369108',
      updatedAt: '1625541369108',
    },
    {
      _id: '60e3caf96ef0ba2c50a61be6',
      username: 'user-c',
      password: '$2b$10$0hKs.64gPU1NPXGCIJg8u.m.rO4ZDTnMqxRZn3ffXOxGRbgNjsGyy',
      role: 'USER',
      createdAt: '1625541369108',
      updatedAt: '1625541369108',
    },
    {
      _id: '60e3caf96ef0ba2c50a61be7',
      username: 'user-d',
      password: '$2b$10$0hKs.64gPU1NPXGCIJg8u.m.rO4ZDTnMqxRZn3ffXOxGRbgNjsGyy',
      role: 'USER',
      createdAt: '1625541369108',
      updatedAt: '1625541369108',
    },
  ]);
}

console.log('[~] Start seeding process');

seed()
  .then(() => {
    console.log('[~] Seeding process complete');

    process.exit(0);
  })
  .catch((err) => {
    console.error(err);

    process.exit(1);
  });
