import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { LikePostModel } from '../graphql.models/like.graphql';
import { LikePostEntity } from '../like-post.entity';
import { LikeService } from '../like.service';

@Resolver(() => LikePostModel)
export class LikeMutationResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => LikePostModel)
  @UseGuards(GqlAuthGuard)
  likePost(
    @CurrentUser() user: UserEntity,
    @Args('id', { type: () => Int }) postId: number,
  ): Promise<LikePostEntity> {
    return this.likeService.likePost(user.id, postId);
  }
}
