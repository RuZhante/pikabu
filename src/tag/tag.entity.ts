import { Base } from 'src/common/entityes/base.entity';
import { PostEntity } from 'src/post/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  @JoinTable()
  posts: PostEntity[];
}
