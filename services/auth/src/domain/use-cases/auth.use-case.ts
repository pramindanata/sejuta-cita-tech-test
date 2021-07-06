import { inject, injectable } from 'tsyringe';
import { Token } from '@/common';
import { CryptHelperContract, UserRepositoryContract } from '@/contract';
import { User } from '../entities';
import { InvalidCredentialGivenException } from '../exception';

@injectable()
export class AuthUseCase {
  constructor(
    @inject(Token.UserRepository)
    private userRepository: UserRepositoryContract,

    @inject(Token.CryptHelper)
    private cryptHelper: CryptHelperContract,
  ) {}

  async login(props: LoginProps): Promise<User> {
    const { username, password } = props;
    const user = await this.userRepository.getDetailByUsername(username);

    if (!user) {
      throw new InvalidCredentialGivenException();
    }

    const passwordIsValid = await this.cryptHelper.validate(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new InvalidCredentialGivenException();
    }

    return user;
  }
}

interface LoginProps {
  username: string;
  password: string;
}
