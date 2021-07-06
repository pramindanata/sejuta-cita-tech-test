import { singleton } from 'tsyringe';
import {
  CreateUserProps,
  UpdateUserProps,
  UserRepositoryContract,
} from '@/contract';
import { User } from '@/domain';
import { Pagination, PaginationOptions } from '@/common';
import { UserModel, UserModelMapper } from '../models';

@singleton()
export class UserRepository implements UserRepositoryContract {
  async getPagination(options: PaginationOptions): Promise<Pagination<User>> {
    const { limit, page } = options;
    const skip = (page - 1) * limit;
    const totalPromise = UserModel.count();
    const dataPromise = UserModel.find({}, undefined, { limit, skip });
    const [total, data] = await Promise.all([totalPromise, dataPromise]);

    return { total, data: data.map(UserModelMapper.toDomain) };
  }

  async getDetail(id: string): Promise<User | undefined> {
    const user = await UserModel.findById(id);

    if (!user) {
      return undefined;
    }

    return UserModelMapper.toDomain(user);
  }

  async create(props: CreateUserProps): Promise<User> {
    const user = await UserModel.create({
      username: props.username,
      password: props.password,
      role: props.role,
    });

    return UserModelMapper.toDomain(user);
  }

  async update(user: User, props: UpdateUserProps): Promise<User> {
    const userModel = new UserModel({
      _id: user.id,
      username: props.username,
      password: props.password,
      role: user.role,
      createdAt: user.createdAt,
    });

    await userModel.save();

    return UserModelMapper.toDomain(userModel);
  }

  async delete(user: User): Promise<void> {
    await UserModel.deleteOne({ _id: user.id });
  }
}
