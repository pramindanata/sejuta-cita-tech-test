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

  async update(user: User, props: UpdateUserProps): Promise<User> {
    await this.userRepository.update(user.id, props);

    const updatedUser = new User({
      id: user.id,
      username: props.username,
      password: props.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: props.updatedAt,
    });

    return updatedUser;
  }

  async delete(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
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

export interface UpdateUserProps {
  username: string;
  password: string;
  updatedAt: Date;
}
