import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
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

  async remove(commentId: number): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOne(commentId);
    return await this.commentRepository.delete(comment);
  }

  async findAll(): Promise<CommentEntity[]> {
    return await this.commentRepository.find();
  }

  async findOne(commentId: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne(commentId);
  }
}
