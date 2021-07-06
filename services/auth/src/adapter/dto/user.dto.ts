import { User } from '@/domain';

export class UserDto {
  id: string;
  username: string;
  role: string;
  createdAt: string;

  constructor(props: UserDtoProps) {
    this.id = props.id;
    this.username = props.username;
    this.role = props.role;
    this.createdAt = props.createdAt;
  }

  static fromDomain(domain: User): UserDto {
    return new UserDto({
      id: domain.id,
      username: domain.username,
      role: domain.role,
      createdAt: domain.createdAt.toISOString(),
    });
  }
}

export interface UserDtoProps {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}
