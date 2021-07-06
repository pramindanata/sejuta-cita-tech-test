import { User } from '@/domain';

export class UserMessageDto {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: UserMessageDtoProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static fromDomain(domain: User): UserMessageDto {
    return new UserMessageDto({
      id: domain.id,
      username: domain.username,
      password: domain.password,
      role: domain.role,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    });
  }
}

export interface UserMessageDtoProps {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
