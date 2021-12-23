import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReactionDto } from './dto/reaction.dto';
import { ReactionEntity } from './reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionEntity)
    private readonly reactionRepository: Repository<ReactionEntity>,
  ) {}

  async reactionPost(
    reactionDto: ReactionDto,
    userId: number,
  ): Promise<ReactionEntity> {
    const reaction = await this.reactionRepository.findOne({
      where: { postId: reactionDto.postId, userId: userId },
    });

    if (!reaction) {
      const newReaction = this.reactionRepository.create(reactionDto);
      newReaction.userId = userId;
      return await this.reactionRepository.save(newReaction);
    }

    Object.assign(reaction, reactionDto);
    return await this.reactionRepository.save(reaction);
  }
}
