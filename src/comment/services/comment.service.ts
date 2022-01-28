import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../comment.entity';
import { CommentRepository } from '../comment.repository';
import { CommentPaginationDto } from '../dto/comment-pagination.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<CommentEntity> {
    const comment = this.commentRepository.create(createCommentDto);
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
    return this.commentRepository.commentPagination(commentPaginationDto);
  }
}
