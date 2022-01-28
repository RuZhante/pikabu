import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentModel } from '../graphql.models/comment.graphql';

@Resolver(() => CommentModel)
export class CommentMutationResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentModel)
  @UseGuards(GqlAuthGuard)
  createComment(
    @Args('createCommentDto') createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @Mutation(() => CommentModel)
  @UseGuards(GqlAuthGuard)
  updateComment(@Args('updateCommentDto') updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto);
  }

  @Mutation(() => CommentModel)
  @UseGuards(GqlAuthGuard)
  removeComment(@Args('id', { type: () => Int }) commentId: number) {
    return this.commentService.remove(commentId);
  }
}
