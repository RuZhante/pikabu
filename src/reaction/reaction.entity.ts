import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reactions' })
export class ReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column()
  reaction: string;

  @ManyToOne(() => PostEntity, (post) => post.reactions)
  post: PostEntity;
}
