import { Connection, Model } from 'mongoose';

export class Seeder {
  constructor(private connection: Connection) {}

  async seed(model: Model<any>, data: any[]): Promise<void> {
    await model.insertMany(data);
  }

  async clear(): Promise<void> {
    const collections = await this.connection.db.collections();

    await Promise.all(collections.map((c) => c.drop()));
  }
}
