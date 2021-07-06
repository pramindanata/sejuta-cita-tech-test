import { inject, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { Cookie, Token } from '@/common';
import { ConfigHelperContract, JwtHelperContract } from '@/contract';
import { AuthUseCase } from '@/domain';
import { UserDto } from '../dto';
import { UnauthenticatedException } from '../exception';

@singleton()
export class AuthController {
  constructor(
    private authUseCase: AuthUseCase,

    @inject(Token.JwtHelper)
    private jwtHelper: JwtHelperContract,

    @inject(Token.ConfigHelper)
    private configHelper: ConfigHelperContract,
  ) {}

  async login(req: Request<any, any, LoginBody>, res: Response): Promise<any> {
    const { username, password } = req.body;
    const user = await this.authUseCase.login({ username, password });
    const token = await this.jwtHelper.create({
      sub: user.id,
    });

    return res.cookie(Cookie.Token, token).json({
      data: UserDto.fromDomain(user),
    });
  }

  async refresh(req: Request, res: Response): Promise<any> {
    const token = req.cookies[Cookie.Token];

    if (!token) {
      throw new UnauthenticatedException();
    }

    const refreshedToken = await this.jwtHelper.refresh(token);

    return res.cookie(Cookie.Token, refreshedToken).json({
      message: 'OK',
    });
  }

  async logout(req: Request, res: Response): Promise<any> {
    return res.clearCookie(Cookie.Token).json({
      message: 'OK',
    });
  }
}

interface LoginBody {
  username: string;
  password: string;
}
