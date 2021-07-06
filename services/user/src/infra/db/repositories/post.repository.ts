import { AbstractRepository, EntityRepository } from 'typeorm';
import { Pagination, PaginationOptions } from '@/common';
import { PostRepositoryContract } from '@/contract';
import { CreatePostProps, Post, UpdatePostProps } from '@/domain';
import { OrmPost } from '../entities';

@EntityRepository(OrmPost)
export class PostRepository
  extends AbstractRepository<OrmPost>
  implements PostRepositoryContract
{
  async getPagination(options: PaginationOptions): Promise<Pagination<Post>> {
    const { limit, page } = options;
    const offset = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      select: ['id', 'title', 'content', 'createdAt'],
      relations: ['author'],
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: data.map(OrmPost.toDomain),
      total,
    };
  }

  async create(props: CreatePostProps): Promise<Post> {
    const { author, content, title } = props;
    const post = await this.repository.save({
      title,
      content,
      author,
    });

    return OrmPost.toDomain(post);
  }

  async getDetail(id: string): Promise<Post | undefined> {
    const post = await this.repository.findOne(id, {
      relations: ['author'],
    });

    return post && OrmPost.toDomain(post);
  }

  async update(id: string, props: UpdatePostProps): Promise<void> {
    const { title, content } = props;

    await this.repository.update(id, { title, content });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
