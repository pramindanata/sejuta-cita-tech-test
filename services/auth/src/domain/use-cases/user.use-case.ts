import { inject, injectable } from 'tsyringe';
import { Token } from '@/common';
import { UserRepositoryContract } from '@/contract';
import { User, UserRole } from '../entities';

@injectable()
export class UserUseCase {
  constructor(
    @inject(Token.UserRepository)
    private userRepository: UserRepositoryContract,
  ) {}

  getDetail(id: string): Promise<User | undefined> {
    return this.userRepository.getDetail(id);
  }

  async create(props: CreateUserProps): Promise<User> {
    const user = await this.userRepository.create(props);

    return user;
  }
}

export interface CreateUserProps {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
