import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'postLikes' })
export class LikePostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => PostEntity, (post) => post.postLikes)
  post: PostEntity;
}
