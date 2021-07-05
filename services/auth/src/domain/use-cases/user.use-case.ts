import { inject, injectable } from 'tsyringe';
import { Token } from '@/common';
import { UserRepositoryContract } from '@/contract';
import { User } from '../entities';

@injectable()
export class UserUseCase {
  constructor(
    @inject(Token.UserRepository)
    private userRepository: UserRepositoryContract,
  ) {}

  getDetail(id: string): Promise<User | undefined> {
    return this.userRepository.getDetail(id);
  }
}
