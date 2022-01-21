import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BookmarkEntity } from './bookmark.entity';
import { CommentBookmarkDto } from './dto/comment-bookmark.dto';
import { PaginationBookmarkDto } from './dto/pagination-bookmark.dto';
import { PostBookmarkDto } from './dto/post-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(BookmarkEntity)
    private readonly bookmarkRepository: Repository<BookmarkEntity>,
  ) {}

  // Post methods
  async addPostInBookmark(
    postBookmarkDto: PostBookmarkDto,
    userId: number,
  ): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { postId: postBookmarkDto.postId, userid: userId },
    });

    if (!bookmark) {
      const newBookmark = this.bookmarkRepository.create(postBookmarkDto);
      newBookmark.userid = userId;
      return await this.bookmarkRepository.save(newBookmark);
    }

    return bookmark;
  }

  async removePostInBookmark(
    postBookmarkDto: PostBookmarkDto,
    userId: number,
  ): Promise<DeleteResult> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { postId: postBookmarkDto.postId, userid: userId },
    });

    if (!bookmark) throw new NotFoundException('Bookmark does not exist');

    return await this.bookmarkRepository.delete(bookmark);
  }

  // Comment methods
  async addCommentInBookmark(
    commentBookmarkDto: CommentBookmarkDto,
    userId: number,
  ): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { commentId: commentBookmarkDto.commentId, userid: userId },
    });

    if (!bookmark) {
      const newBookmark = this.bookmarkRepository.create(commentBookmarkDto);
      newBookmark.userid = userId;
      return await this.bookmarkRepository.save(newBookmark);
    }

    return bookmark;
  }

  async removeCommentInBookmark(
    commentBookmarkDto: CommentBookmarkDto,
    userId: number,
  ): Promise<DeleteResult> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { commentId: commentBookmarkDto.commentId, userid: userId },
    });

    if (!bookmark) throw new NotFoundException('Bookmark does not exist');

    return await this.bookmarkRepository.delete(bookmark);
  }

  async paginationBookmark(
    userId: number,
    paginationBookmarkDto: PaginationBookmarkDto,
  ): Promise<BookmarkEntity[]> {
    const qb = this.bookmarkRepository.createQueryBuilder('bookmarks');

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
