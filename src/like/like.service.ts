import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/post.entity';
import { getRepository, Repository } from 'typeorm';
import { LikePostEntity } from './like-post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikePostEntity)
    private readonly likePostRepository: Repository<LikePostEntity>,
  ) {}

  async likePost(userId: number, postId: number): Promise<LikePostEntity> {
    const likes = await this.likePostRepository.find({
      where: { postId: postId },
    });

    const like = likes.find((like) => like.userId == userId);

    if (likes && like)
      throw new UnprocessableEntityException(
        'This user has already liked this post',
      );

    const likePost = await this.likePostRepository.create();
    likePost.userId = userId;
    likePost.postId = postId;

    const post = await getRepository(PostEntity).findOne(postId);
    post.countLikes++;
    await getRepository(PostEntity).save(post);

    return await this.likePostRepository.save(likePost);
  }
}
