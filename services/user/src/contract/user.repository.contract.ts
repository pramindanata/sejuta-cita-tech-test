import { Pagination, PaginationOptions } from '@/common';
import { User, UserRole } from '@/domain';

export interface UserRepositoryContract {
  getPagination(options: PaginationOptions): Promise<Pagination<User>>;
  create(props: CreateUserProps): Promise<User>;
  getDetail(id: string): Promise<User | undefined>;
  update(user: User, props: UpdateUserProps): Promise<User>;
  delete(user: User): Promise<void>;
}

export interface CreateUserProps {
  username: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserProps {
  username: string;
  password: string;
}
