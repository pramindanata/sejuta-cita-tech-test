import { inject, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { Cookie, Token } from '@/common';
import { JwtHelperContract } from '@/contract';
import { AuthUseCase } from '@/domain';
import { UserDto } from '../dto';

@singleton()
export class AuthController {
  constructor(
    private authUseCase: AuthUseCase,

    @inject(Token.JwtHelper)
    private jwtHelper: JwtHelperContract,
  ) {}

  async login(req: Request<any, any, LoginBody>, res: Response): Promise<any> {
    const { email, password } = req.body;
    const user = await this.authUseCase.login({ email, password });
    const token = await this.jwtHelper.create({ sub: user.id });

    return res.cookie(Cookie.Token, token).json({
      data: UserDto.fromDomain(user),
    });
  }

  async register(
    req: Request<any, any, RegisterBody>,
    res: Response,
  ): Promise<any> {
    const { email, password } = req.body;
    const user = await this.authUseCase.register({ email, password });
    const token = await this.jwtHelper.create({ sub: user.id });

    return res.cookie(Cookie.Token, token).json({
      data: UserDto.fromDomain(user),
    });
  }

  async logout(req: Request, res: Response): Promise<any> {
    return res.clearCookie(Cookie.Token).json({
      message: 'OK',
    });
  }

  async me(req: Request, res: Response): Promise<any> {
    const user = req.ctx.user!;

    return res.json({
      data: UserDto.fromDomain(user),
    });
  }
}

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  email: string;
  password: string;
}
