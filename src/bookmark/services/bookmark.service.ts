import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarkEntity } from '../bookmark.entity';
import { BookmarkRepository } from '../bookmark.repository';
import { CommentBookmarkDto } from '../dto/comment-bookmark.dto';
import { PaginationBookmarkDto } from '../dto/pagination-bookmark.dto';
import { PostBookmarkDto } from '../dto/post-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

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
  ): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { postId: postBookmarkDto.postId, userid: userId },
    });

    if (!bookmark) throw new NotFoundException('Bookmark does not exist');

    return await this.bookmarkRepository.remove(bookmark);
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
  ): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { commentId: commentBookmarkDto.commentId, userid: userId },
    });

    if (!bookmark) throw new NotFoundException('Bookmark does not exist');

    return await this.bookmarkRepository.remove(bookmark);
  }

  async paginationBookmark(
    userId: number,
    paginationBookmarkDto: PaginationBookmarkDto,
  ): Promise<BookmarkEntity[]> {
    return this.bookmarkRepository.paginationBookmark(
      userId,
      paginationBookmarkDto,
    );
  }
}
