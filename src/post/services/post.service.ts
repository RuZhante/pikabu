import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostPaginationDto } from '../dto/post-pagination.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../post.entity';
import { PostRepository } from '../post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<PostEntity> {
    const post = this.postRepository.create(createPostDto);
    post.userId = userId;
    return await this.postRepository.save(post);
  }

  async update(updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return await this.postRepository.save(updatePostDto);
  }

  async remove(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne(postId);
    return await this.postRepository.remove(post);
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async findOne(postId: number): Promise<PostEntity> {
    return await this.postRepository.findOne(postId);
  }

  async postPagination(
    postPaginationDto: PostPaginationDto,
  ): Promise<PostEntity | PostEntity[]> {
    return this.postRepository.postPagination(postPaginationDto);
  }
}
