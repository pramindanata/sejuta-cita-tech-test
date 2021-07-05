export class User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }
}

export interface UserProps {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}
