import { inject, injectable } from 'tsyringe';
import { Pagination, PaginationOptions, Token } from '@/common';
import { CryptHelperContract, UserRepositoryContract } from '@/contract';
import { User, UserRole } from '../entities';

@injectable()
export class UserUseCase {
  constructor(
    @inject(Token.UserRepostory)
    private userRepo: UserRepositoryContract,

    @inject(Token.CryptHelper)
    private cryptHelper: CryptHelperContract,
  ) {}

  async getPagination(options: PaginationOptions): Promise<Pagination<User>> {
    const pagination = await this.userRepo.getPagination(options);

    return pagination;
  }

  async getDetail(id: string): Promise<User | undefined> {
    const user = await this.userRepo.getDetail(id);

    return user;
  }

  async create(props: CreateUserProps): Promise<User> {
    const hashedPassword = await this.cryptHelper.hash(props.password);
    const user = await this.userRepo.create({
      ...props,
      role: UserRole.User,
      password: hashedPassword,
    });

    return user;
  }

  async update(user: User, props: UpdateUserProps): Promise<User> {
    const hashedPassword = await this.cryptHelper.hash(props.password);
    const updatedUser = await this.userRepo.update(user, {
      username: props.username,
      password: hashedPassword,
    });

    return updatedUser;
  }

  async delete(user: User): Promise<void> {
    await this.userRepo.delete(user);
  }
}

export interface CreateUserProps {
  username: string;
  password: string;
}

export type UpdateUserProps = CreateUserProps;
