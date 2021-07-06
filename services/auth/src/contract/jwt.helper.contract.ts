export interface JwtHelperContract {
  create(payload: JwtPayload): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
}

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  ref_exp: number;
}
