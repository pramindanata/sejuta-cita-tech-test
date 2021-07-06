export interface CryptHelperContract {
  hash(text: string): Promise<string>;
  validate(text: string, hash: string): Promise<boolean>;
}
