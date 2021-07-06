import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserRepositoryContract, CreateUserProps } from '@/contract';
import { User } from '@/domain';
import { OrmUser } from '../entities';

@EntityRepository(OrmUser)
export class UserRepository
  extends AbstractRepository<OrmUser>
  implements UserRepositoryContract
{
  async getDetail(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user && OrmUser.toDomain(user);
  }

  async getDetailByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user && OrmUser.toDomain(user);
  }

  async create(props: CreateUserProps): Promise<User> {
    const user = await this.repository.save({
      email: props.email,
      password: props.password,
    });

    return OrmUser.toDomain(user);
  }
}
