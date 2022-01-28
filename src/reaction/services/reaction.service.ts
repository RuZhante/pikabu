import { Injectable } from '@nestjs/common';
import { ReactionCommentDto } from '../dto/reaction-comment.dto';
import { ReactionPostDto } from '../dto/reaction-post.dto';
import { ReactionEntity } from '../reaction.entity';
import { ReactionRepository } from '../reaction.repository';

@Injectable()
export class ReactionService {
  constructor(private readonly reactionRepository: ReactionRepository) {}

  async reactionPost(
    reactionPostDto: ReactionPostDto,
    userId: number,
  ): Promise<ReactionEntity> {
    const reaction = await this.reactionRepository.findOne({
      where: { postId: reactionPostDto.postId, userId: userId },
    });

    if (!reaction) {
      const newReaction = this.reactionRepository.create(reactionPostDto);
      newReaction.userId = userId;
      return await this.reactionRepository.save(newReaction);
    }

    Object.assign(reaction, reactionPostDto);
    return await this.reactionRepository.save(reaction);
  }

  async reactionComment(
    reactionCommentDto: ReactionCommentDto,
    userId: number,
  ): Promise<ReactionEntity> {
    const reaction = await this.reactionRepository.findOne({
      where: { commentId: reactionCommentDto.commentId, userId: userId },
    });

    if (!reaction) {
      const newReaction = this.reactionRepository.create(reactionCommentDto);
      newReaction.userId = userId;
      return await this.reactionRepository.save(newReaction);
    }

    Object.assign(reaction, reactionCommentDto);
    return await this.reactionRepository.save(reaction);
  }
}
