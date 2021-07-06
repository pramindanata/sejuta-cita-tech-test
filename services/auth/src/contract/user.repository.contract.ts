import { CreateUserProps, User } from '@/domain';

export interface UserRepositoryContract {
  getDetail(id: string): Promise<User | undefined>;
  getDetailByUsername(username: string): Promise<User | undefined>;
  create(props: CreateUserProps): Promise<User>;
}
