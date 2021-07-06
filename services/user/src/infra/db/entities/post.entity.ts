import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '@/domain';
import { Table } from '../constant';
import { OrmUser } from './user.entity';

@Entity({
  name: Table.Post,
})
export class OrmPost {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  content!: string;

  @Column({
    type: 'bigint',
  })
  authorId?: string;

  @ManyToOne(() => OrmUser)
  author?: OrmUser;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  static toDomain(model: OrmPost): Post {
    const post = new Post(model);

    return post;
  }
}
