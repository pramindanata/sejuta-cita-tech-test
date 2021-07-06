import { inject, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { Cookie, Token } from '@/common';
import { ConfigHelperContract, JwtHelperContract } from '@/contract';
import { AuthUseCase } from '@/domain';
import { UserDto } from '../dto';

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
    const currentSecond = Math.floor(Date.now() / 1000);
    const jwtExpDurationInSecond = this.configHelper.get(
      'jwt.expDurationInSecond',
    );
    const jwtRefExpDurationInSecond = this.configHelper.get(
      'jwt.refExpDurationInSecond',
    );
    const token = await this.jwtHelper.create({
      sub: user.id,
      iat: currentSecond,
      exp: currentSecond + jwtExpDurationInSecond,
      ref_exp: currentSecond + jwtRefExpDurationInSecond,
    });

    return res.cookie(Cookie.Token, token).json({
      data: UserDto.fromDomain(user),
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
