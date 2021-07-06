import { singleton } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { JwtPayload, JwtHelperContract } from '@/contract';
import { ConfigHelper } from './config.helper';

@singleton()
export class JwtHelper implements JwtHelperContract {
  constructor(private configHelper: ConfigHelper) {}

  create(payload: JwtPayload): Promise<string> {
    const secret = this.configHelper.get('app.secret');

    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token!);
      });
    });
  }

  verify(token: string): Promise<JwtPayload> {
    const secret = this.configHelper.get('app.secret');

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, {}, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded as JwtPayload);
      });
    });
  }
}
