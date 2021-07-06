import { inject, injectable } from 'tsyringe';
import { Token } from '@/common';
import { CryptHelperContract, UserRepositoryContract } from '@/contract';
import { User } from '../entities';
import {
  EmailAlreadyTakenException,
  InvalidCredentialGivenException,
} from '../exception';

@injectable()
export class AuthUseCase {
  constructor(
    @inject(Token.UserRepository)
    private userRepository: UserRepositoryContract,

    @inject(Token.CryptHelper)
    private cryptHelper: CryptHelperContract,
  ) {}

  async login(props: LoginProps): Promise<User> {
    const { email, password } = props;
    const user = await this.userRepository.getDetailByEmail(email);

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

  async register(props: RegisterProps): Promise<User> {
    const { email, password } = props;
    const otherUser = await this.userRepository.getDetailByEmail(email);

    if (otherUser) {
      throw new EmailAlreadyTakenException();
    }

    const hashedPassword = await this.cryptHelper.hash(password);
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return user;
  }
}

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  email: string;
  password: string;
}
