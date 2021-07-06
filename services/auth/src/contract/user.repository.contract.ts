import { User } from '@/domain';

export interface UserRepositoryContract {
  getDetail(id: string): Promise<User | undefined>;
  getDetailByUsername(username: string): Promise<User | undefined>;
}

export interface CreateUserProps {
  email: string;
  password: string;
}
