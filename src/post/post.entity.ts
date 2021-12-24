import { BookmarkEntity } from 'src/bookmark/bookmark.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: true })
  tag: number;

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
}
