import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { ReactionDto } from '../dto/reaction.dto';
import { ReactionModel } from '../graphql.models/reaction.graphql';
import { ReactionEntity } from '../reaction.entity';
import { ReactionService } from '../reaction.service';

@Resolver(() => ReactionModel)
export class ReactionMutationResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(() => ReactionModel)
  @UseGuards(GqlAuthGuard)
  reactionPost(
    @CurrentUser() user: UserEntity,
    @Args('reactionDto', { type: () => ReactionDto }) reactionDto: ReactionDto,
  ): Promise<ReactionEntity> {
    return this.reactionService.reactionPost(reactionDto, user.id);
  }
}
