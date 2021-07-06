import { Post, User } from '../entities';

export class PostPolicy {
  create(): boolean {
    return true;
  }

  update(user: User, post: Post): boolean {
    return user.id === post.getAuthor().id;
  }

  delete(user: User, post: Post): boolean {
    return user.id === post.getAuthor().id;
  }
}
