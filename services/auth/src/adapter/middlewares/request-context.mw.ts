import { RequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { inject, singleton } from 'tsyringe';
import { Cookie, MiddlewareFactory, Token } from '@/common';
import { JwtHelperContract } from '@/contract';
import { User, UserUseCase } from '@/domain';
import { UnauthenticatedException } from '../exception';

@singleton()
export class RequestContext implements MiddlewareFactory {
  constructor(
    private userUseCase: UserUseCase,

    @inject(Token.JwtHelper)
    private jwtHelper: JwtHelperContract,
  ) {}

  create(): RequestHandler {
    return async (req, res, next) => {
      const { cookies } = req;
      const user = await this.authenticate(cookies);

      req.ctx = {
        user,
      };

      next();
    };
  }

  private async authenticate(cookies: any): Promise<User | undefined> {
    if (!cookies[Cookie.Token]) {
      return undefined;
    }

    try {
      const token = cookies[Cookie.Token] as string;
      const tokenPayload = await this.jwtHelper.verify(token);
      const user = await this.userUseCase.getDetail(tokenPayload.sub);

      return user;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthenticatedException();
      }

      throw err;
    }
  }
}
