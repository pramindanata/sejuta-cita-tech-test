import { UndefinedPropertyException } from '@/common';
import { User, UserProps } from './user';

export class Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author?: User;

  constructor(props: PostProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;

    if (props.author) {
      this.author = new User(props.author);
    }
  }

  getAuthor(): User {
    if (!this.author) {
      throw new UndefinedPropertyException();
    }

    return this.author;
  }
}

export interface PostProps {
  id: string;
  title: string;
  content: string;
  author?: UserProps;
  createdAt: Date;
}
