import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentPaginationDto } from './dto/comment-pagination.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<CommentEntity> {
    const comment = await this.commentRepository.create(createCommentDto);
    comment.userId = userId;
    return await this.commentRepository.save(comment);
  }

  async update(updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    return await this.commentRepository.save(updateCommentDto);
  }

  async remove(commentId: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(commentId);
    return await this.commentRepository.remove(comment);
  }

  async findAll(): Promise<CommentEntity[]> {
    return await this.commentRepository.find();
  }

  async findOne(commentId: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne(commentId);
  }

  async commentPagination(
    commentPaginationDto: CommentPaginationDto,
  ): Promise<CommentEntity[]> {
    const qb = this.commentRepository
      .createQueryBuilder('comments')
      .where('comments.postId = :postId', {
        postId: commentPaginationDto.postId,
      });

    if (commentPaginationDto.pagination.skip)
      qb.skip(commentPaginationDto.pagination.skip);

    if (commentPaginationDto.pagination.take)
      qb.take(commentPaginationDto.pagination.take);

    if (commentPaginationDto.countLikes) {
      qb.leftJoin('comments.reactions', 'reactions');
      qb.groupBy('comments.id');
      qb.select(
        `comments.id as id, comments.postId as postId, comments.userId as userId, comments.text as text, comments.image as image, sum(case reaction when 'LIKE' then 1 else 0 end) as raiting`,
      );
      qb.orderBy('raiting', 'DESC');
      const comments = await qb.execute();

      console.log(423423423423, comments);
      return comments;
    }

    qb.orderBy('comments.createdAt', 'DESC');

    const comments = qb.getMany();
    return comments;
  }
}
