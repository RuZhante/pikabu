import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CommentService } from '../services/comment.service';
import { CommentPaginationDto } from '../dto/comment-pagination.dto';
import { CommentModel } from '../graphql.models/comment.graphql';

@Resolver(() => CommentModel)
export class CommentQueryResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentModel], { name: 'comments' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => CommentModel, { name: 'comment' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) commentId: number) {
    return this.commentService.findOne(commentId);
  }

  @Query(() => [CommentModel], { name: 'commentPagination' })
  @UseGuards(GqlAuthGuard)
  commentPagination(
    @Args('commentPaginationDto', { type: () => CommentPaginationDto })
    commentPaginationDto: CommentPaginationDto,
  ) {
    return this.commentService.commentPagination(commentPaginationDto);
  }
}
