import { singleton } from 'tsyringe';
import { UserRepositoryContract } from '@/contract';
import { CreateUserProps, User } from '@/domain';
import { UserModel, UserModelMapper } from '../models';

@singleton()
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

  async create(props: CreateUserProps): Promise<User> {
    const user = await UserModel.create({
      _id: props.id,
      username: props.username,
      password: props.password,
      role: props.role,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    return UserModelMapper.toDomain(user);
  }
}
