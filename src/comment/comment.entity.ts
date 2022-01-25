import { BookmarkEntity } from 'src/bookmark/bookmark.entity';
import { Base } from 'src/common/entityes/base.entity';
import { PostEntity } from 'src/post/post.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @OneToMany(() => ReactionEntity, (reaction) => reaction.comment)
  reactions: ReactionEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.comment)
  bookmarks: BookmarkEntity[];
}
