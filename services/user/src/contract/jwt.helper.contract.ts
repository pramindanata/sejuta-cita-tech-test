export interface JwtHelperContract {
  create(payload: Pick<JwtPayload, 'sub'>): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
}

export interface JwtPayload {
  sub: string;
  iat: number;
  nbf: number;
}
