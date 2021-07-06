export abstract class BaseDomainException extends Error {}

export class UsernameAlreadyTakenException extends BaseDomainException {
  constructor() {
    super('Username already taken');
  }
}

export class InvalidCredentialGivenException extends BaseDomainException {
  constructor() {
    super('Invalid credentials given');
  }
}
