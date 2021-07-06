export abstract class BaseDomainException extends Error {}

export class InvalidCredentialGivenException extends BaseDomainException {
  constructor() {
    super('Invalid credentials given');
  }
}
