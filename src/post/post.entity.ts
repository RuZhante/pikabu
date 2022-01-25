import { BookmarkEntity } from 'src/bookmark/bookmark.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
import { TagEntity } from 'src/tag/tag.entity';
import { TagType } from 'src/tag/types/tag.types';
import { UserEntity } from 'src/user/user.entity';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.post)
  reactions: ReactionEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.post)
  bookmarks: BookmarkEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  tags: TagEntity[];
}
