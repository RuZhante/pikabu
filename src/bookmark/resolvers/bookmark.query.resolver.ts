import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { BookmarkService } from '../bookmark.service';
import { PaginationBookmarkDto } from '../dto/pagination-bookmark.dto';
import { BookmarkModel } from '../graphql.models/bookmark.graphql';

@Resolver(() => BookmarkModel)
export class BookmarkQueryResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Query(() => [BookmarkModel], { name: 'paginationBookmark' })
  @UseGuards(GqlAuthGuard)
  async paginationBookmark(
    @Args('paginationBookmarkDto', { type: () => PaginationBookmarkDto })
    paginationBookmarkDto: PaginationBookmarkDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.bookmarkService.paginationBookmark(
      user.id,
      paginationBookmarkDto,
    );
  }
}
