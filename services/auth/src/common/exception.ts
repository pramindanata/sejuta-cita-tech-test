import {
  ExceptionContextType,
  ExceptionContextTypeContext,
  ExceptionHttpContext,
} from './interface';

export class UndefinedPropertyException extends Error {
  constructor() {
    super('Undefined property called');
  }
}

export class ExceptionContext {
  constructor(
    private type: ExceptionContextType,
    private typeContext: ExceptionContextTypeContext,
  ) {}

  getType(): ExceptionContextType {
    return this.type;
  }

  getHttpContext(): ExceptionHttpContext {
    if (this.type !== 'http') {
      throw new Error('Invalid type selected');
    }

    return this.typeContext as ExceptionHttpContext;
  }

  getPubSubContext(): undefined {
    return undefined;
  }

  getEventEmitterContext(): undefined {
    return undefined;
  }
}
