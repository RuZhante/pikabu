import { EntityRepository, Repository } from 'typeorm';
import { BookmarkEntity } from './bookmark.entity';
import { PaginationBookmarkDto } from './dto/pagination-bookmark.dto';

@EntityRepository(BookmarkEntity)
export class BookmarkRepository extends Repository<BookmarkEntity> {
  async paginationBookmark(
    userId: number,
    paginationBookmarkDto: PaginationBookmarkDto,
  ): Promise<BookmarkEntity[]> {
    const qb = this.createQueryBuilder('bookmarks');

    if (paginationBookmarkDto.post) {
      qb.leftJoinAndSelect('bookmarks.post', 'post').where(
        'post.userId = :userId',
        { userId },
      );
    }

    if (paginationBookmarkDto.comment) {
      qb.leftJoinAndSelect('bookmarks.comment', 'comment').where(
        'comment.userId = :userId',
        { userId },
      );
    }

    if (paginationBookmarkDto.pagination.skip)
      qb.skip(paginationBookmarkDto.pagination.skip);

    if (paginationBookmarkDto.pagination.take)
      qb.take(paginationBookmarkDto.pagination.take);

    return qb.getMany();
  }
}
