import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { ReactionCommentDto } from '../dto/reaction-comment.dto';
import { ReactionPostDto } from '../dto/reaction-post.dto';
import { ReactionModel } from '../graphql.models/reaction.graphql';
import { ReactionEntity } from '../reaction.entity';
import { ReactionService } from '../services/reaction.service';

@Resolver(() => ReactionModel)
export class ReactionMutationResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(() => ReactionModel)
  @UseGuards(GqlAuthGuard)
  reactionPost(
    @CurrentUser() user: UserEntity,
    @Args('reactionPostDto', { type: () => ReactionPostDto })
    reactionPostDto: ReactionPostDto,
  ): Promise<ReactionEntity> {
    return this.reactionService.reactionPost(reactionPostDto, user.id);
  }

  @Mutation(() => ReactionModel)
  @UseGuards(GqlAuthGuard)
  reactionComment(
    @CurrentUser() user: UserEntity,
    @Args('reactionCommentDto', { type: () => ReactionCommentDto })
    reactionCommentDto: ReactionCommentDto,
  ): Promise<ReactionEntity> {
    return this.reactionService.reactionComment(reactionCommentDto, user.id);
  }
}
