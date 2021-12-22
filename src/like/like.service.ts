import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikePostEntity } from './like-post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikePostEntity)
    private readonly likePostRepository: Repository<LikePostEntity>,
  ) {}

  async likePost(userId: number, postId: number): Promise<LikePostEntity> {
    const likePost = await this.likePostRepository.create();
    likePost.userId = userId;
    likePost.postId = postId;
    return await this.likePostRepository.save(likePost);
  }
}
