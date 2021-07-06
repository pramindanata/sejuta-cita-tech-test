import { singleton } from 'tsyringe';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {
  JwtPayload,
  JwtHelperContract,
  FillableJwtPayload,
  JwtVerifyOptions,
} from '@/contract';
import { ConfigHelper } from './config.helper';

@singleton()
export class JwtHelper implements JwtHelperContract {
  constructor(private configHelper: ConfigHelper) {}

  create(payload: FillableJwtPayload): Promise<string> {
    const secret = this.configHelper.get('app.secret');
    const { currentSecond, expDurationInSecond, refExpDurationInSecond } =
      this.getCurrentAndExpDurationSeconds();

    return new Promise((resolve, reject) => {
      const finalPayload: Omit<JwtPayload, 'sub'> = Object.assign(
        {
          iat: currentSecond,
          exp: currentSecond + expDurationInSecond,
          refExp: currentSecond + refExpDurationInSecond,
        },
        payload,
      );

      jwt.sign(finalPayload, secret, (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token!);
      });
    });
  }

  verify(token: string, options?: JwtVerifyOptions): Promise<JwtPayload> {
    const secret = this.configHelper.get('app.secret');

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded as JwtPayload);
      });
    });
  }

  async refresh(token: string): Promise<string> {
    const { currentSecond, expDurationInSecond } =
      this.getCurrentAndExpDurationSeconds();
    const { sub, refExp } = await this.verify(token, {
      ignoreExpiration: true,
    });

    if (refExp < currentSecond) {
      throw new JsonWebTokenError('Refresh value is expired');
    }

    const refreshedToken = await this.create({
      sub,
      refExp,
      iat: currentSecond,
      exp: currentSecond + expDurationInSecond,
    });

    return refreshedToken;
  }

  private getCurrentAndExpDurationSeconds() {
    const currentSecond = Math.floor(Date.now() / 1000);
    const expDurationInSecond = this.configHelper.get(
      'jwt.expDurationInSecond',
    );
    const refExpDurationInSecond = this.configHelper.get(
      'jwt.refExpDurationInSecond',
    );

    return { currentSecond, expDurationInSecond, refExpDurationInSecond };
  }
}
