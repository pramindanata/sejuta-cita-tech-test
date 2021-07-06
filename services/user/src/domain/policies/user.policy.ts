import { User } from '../entities';

export class UserPolicy {
  viewAny(user: User): boolean {
    return user.isAdmin();
  }

  view(user: User, subject: User): boolean {
    if (user.id === subject.id) {
      return true;
    }

    return user.isAdmin();
  }

  create(user: User): boolean {
    return user.isAdmin();
  }

  update(user: User, subject: User): boolean {
    return user.isAdmin() && user.id !== subject.id;
  }

  delete(user: User, subject: User): boolean {
    return user.isAdmin() && user.id !== subject.id;
  }
}
