export interface JwtHelperContract {
  create(payload: FillableJwtPayload): Promise<string>;
  verify(token: string, options?: JwtVerifyOptions): Promise<JwtPayload>;
  refresh(token: string): Promise<string>;
}

export interface FillableJwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
  refExp?: number;
}

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  refExp: number;
}

export interface JwtVerifyOptions {
  ignoreExpiration: boolean;
}
