import { User } from '@/domain';

export interface UserRepositoryContract {
  getDetail(id: string): Promise<User | undefined>;
  getDetailByEmail(email: string): Promise<User | undefined>;
  create(props: CreateUserProps): Promise<User>;
}

export interface CreateUserProps {
  email: string;
  password: string;
}
