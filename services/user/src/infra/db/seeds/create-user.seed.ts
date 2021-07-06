import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { OrmUser } from '../entities';

export default class CreateUserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OrmUser)
      .values([
        {
          email: 'pramindanata.eksa@gmail.com',
          password:
            '$2b$10$1/V9qUoDd0XJmVrAvD/J/OAwL.s4QHqeQSdyvHmIleKz6i6srEY42',
        },
      ])
      .execute();
  }
}
