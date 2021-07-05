import { User } from '@/domain';

export interface UserRepositoryContract {
  getDetailByEmail(email: string): Promise<User | undefined>;
}

export interface CreateUserProps {
  email: string;
  password: string;
}
