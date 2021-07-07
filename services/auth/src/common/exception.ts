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
    if (this.type !== 'pubsub') {
      throw new Error('Invalid type selected');
    }

    return undefined;
  }

  getEventEmitterContext(): undefined {
    if (this.type !== 'event-emitter') {
      throw new Error('Invalid type selected');
    }

    return undefined;
  }
}
