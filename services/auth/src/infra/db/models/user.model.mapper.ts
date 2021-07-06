import { User } from '@/domain';
import { UserModelDoc } from './user.model';

export class UserModelMapper {
  static toDomain(model: UserModelDoc): User {
    const user = new User({
      id: model._id,
      username: model.username,
      password: model.password,
      role: model.role,
      createdAt: model.createdAt,
    });

    return user;
  }
}
