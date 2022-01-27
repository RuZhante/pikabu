import { BookmarkEntity } from 'src/bookmark/bookmark.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { Base } from 'src/common/entityes/base.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
import { TagEntity } from 'src/tag/tag.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity extends Base {
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

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
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
