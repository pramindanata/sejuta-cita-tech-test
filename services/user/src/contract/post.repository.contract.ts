import { Pagination, PaginationOptions } from '@/common';
import { CreatePostProps, Post, UpdatePostProps } from '@/domain';

export interface PostRepositoryContract {
  getPagination(options: PaginationOptions): Promise<Pagination<Post>>;
  create(props: CreatePostProps): Promise<Post>;
  getDetail(id: string): Promise<Post | undefined>;
  update(id: string, props: UpdatePostProps): Promise<void>;
  delete(id: string): Promise<void>;
}
