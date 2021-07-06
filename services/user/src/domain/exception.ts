export abstract class BaseDomainException extends Error {}

export class EmailAlreadyTakenException extends BaseDomainException {
  constructor() {
    super('Email already taken');
  }
}

export class InvalidCredentialGivenException extends BaseDomainException {
  constructor() {
    super('Invalid credentials given');
  }
}
