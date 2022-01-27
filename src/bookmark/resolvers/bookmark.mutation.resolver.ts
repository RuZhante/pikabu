import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { BookmarkService } from '../bookmark.service';
import { CommentBookmarkDto } from '../dto/comment-bookmark.dto';
import { PostBookmarkDto } from '../dto/post-bookmark.dto';
import { BookmarkModel } from '../graphql.models/bookmark.graphql';

@Resolver(() => BookmarkModel)
export class BookmarkMutationResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Mutation(() => BookmarkModel)
  @UseGuards(GqlAuthGuard)
  addPostInBookmark(
    @CurrentUser() user: UserEntity,
    @Args('postBookmarkDto', { type: () => PostBookmarkDto })
    postBookmarkDto: PostBookmarkDto,
  ) {
    return this.bookmarkService.addPostInBookmark(postBookmarkDto, user.id);
  }

  @Mutation(() => BookmarkModel)
  @UseGuards(GqlAuthGuard)
  removePostInBookmark(
    @CurrentUser() user: UserEntity,
    @Args('postBookmarkDto', { type: () => PostBookmarkDto })
    postBookmarkDto: PostBookmarkDto,
  ) {
    return this.bookmarkService.removePostInBookmark(postBookmarkDto, user.id);
  }

  // Comment
  @Mutation(() => BookmarkModel)
  @UseGuards(GqlAuthGuard)
  addCommentInBookmark(
    @CurrentUser() user: UserEntity,
    @Args('commentBookmarkDto', { type: () => CommentBookmarkDto })
    commentBookmarkDto: CommentBookmarkDto,
  ) {
    return this.bookmarkService.addCommentInBookmark(
      commentBookmarkDto,
      user.id,
    );
  }

  @Mutation(() => BookmarkModel)
  @UseGuards(GqlAuthGuard)
  removeCommentInBookmark(
    @CurrentUser() user: UserEntity,
    @Args('commentBookmarkDto', { type: () => CommentBookmarkDto })
    commentBookmarkDto: CommentBookmarkDto,
  ) {
    return this.bookmarkService.removeCommentInBookmark(
      commentBookmarkDto,
      user.id,
    );
  }
}
