import { CommentEntity } from 'src/comment/comment.entity';
import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bookmarks' })
export class BookmarkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => PostEntity, (post) => post.bookmarks)
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.bookmarks)
  comment: CommentEntity;
}
