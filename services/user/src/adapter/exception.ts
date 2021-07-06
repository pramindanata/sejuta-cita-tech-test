export abstract class BaseHTTPException extends Error {
  abstract getCode(): number;
  abstract getBody(): Record<string, string | number>;
}

export class NotFoundException extends BaseHTTPException {
  constructor() {
    super('Not found');
  }

  getCode(): number {
    return 404;
  }

  getBody(): Record<string, any> {
    return {
      message: this.message,
    };
  }
}

export class UnauthenticatedException extends BaseHTTPException {
  constructor() {
    super('Unauthenticated');
  }

  getCode(): number {
    return 401;
  }

  getBody(): Record<string, any> {
    return {
      message: this.message,
    };
  }
}

export class UnauthorizedException extends BaseHTTPException {
  constructor() {
    super('Unauthorized');
  }

  getCode(): number {
    return 403;
  }

  getBody(): Record<string, any> {
    return {
      message: this.message,
    };
  }
}

export class UnprocessableEntityException extends BaseHTTPException {
  constructor(private payload: Record<string, any>) {
    super('Unprocessable Entity');
  }

  getCode(): number {
    return 422;
  }

  getBody(): Record<string, any> {
    return {
      message: this.message,
      data: this.payload,
    };
  }
}
