import { User } from '@/domain';

export class UserDto {
  id: string;
  email: string;
  createdAt: string;

  constructor(props: UserDtoProps) {
    this.id = props.id;
    this.email = props.email;
    this.createdAt = props.createdAt;
  }

  static fromDomain(domain: User): UserDto {
    return new UserDto({
      id: domain.id,
      email: domain.email,
      createdAt: domain.createdAt.toISOString(),
    });
  }
}

export interface UserDtoProps {
  id: string;
  email: string;
  createdAt: string;
}
