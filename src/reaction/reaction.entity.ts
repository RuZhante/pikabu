import { CommentEntity } from 'src/comment/comment.entity';
import { Base } from 'src/common/entityes/base.entity';
import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reactions' })
export class ReactionEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @Column()
  reaction: string;

  @ManyToOne(() => PostEntity, (post) => post.reactions)
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.reactions)
  comment: CommentEntity;
}
