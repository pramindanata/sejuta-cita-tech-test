export class User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.role = props.role;
    this.createdAt = props.createdAt;
  }
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface UserProps {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}
