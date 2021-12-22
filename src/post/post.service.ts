import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostPaginationDto } from './dto/post-pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<PostEntity> {
    const post = await this.postRepository.create(createPostDto);
    post.userId = userId;
    return await this.postRepository.save(post);
  }

  async update(updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return await this.postRepository.save(updatePostDto);
  }

  async remove(postId: number): Promise<DeleteResult> {
    const post = await this.postRepository.findOne(postId);
    return await this.postRepository.delete(post);
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
    const qb = await this.postRepository.createQueryBuilder('posts');

    if (postPaginationDto.pagination.skip)
      qb.skip(postPaginationDto.pagination.skip);

    if (postPaginationDto.pagination.take)
      qb.take(postPaginationDto.pagination.take);

    if (postPaginationDto.title)
      qb.andWhere('posts.title = :title', {
        title: postPaginationDto.title,
      });

    qb.orderBy('posts.createdAt', 'DESC');

    const posts = qb.getMany();
    return posts;
  }
}
