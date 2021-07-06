import { UserRepositoryContract } from '@/contract';
import { User } from '@/domain';
import { UserModel, UserModelMapper } from '../models';

export class UserRepository implements UserRepositoryContract {
  async getDetail(id: string): Promise<User | undefined> {
    const user = await UserModel.findById(id);

    if (!user) {
      return undefined;
    }

    return UserModelMapper.toDomain(user);
  }

  async getDetailByUsername(username: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return undefined;
    }

    return UserModelMapper.toDomain(user);
  }
}
