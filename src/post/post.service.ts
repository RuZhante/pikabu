import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/tag/tag.entity';
import { DeleteResult, getRepository, Repository } from 'typeorm';
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
    const qb = this.postRepository.createQueryBuilder('posts');

    if (postPaginationDto.pagination.skip)
      qb.skip(postPaginationDto.pagination.skip);

    if (postPaginationDto.pagination.take)
      qb.take(postPaginationDto.pagination.take);

    if (postPaginationDto.title)
      qb.andWhere('posts.title = :title', {
        title: postPaginationDto.title,
      });

    if (postPaginationDto.countLikes) {
      qb.leftJoin('posts.reactions', 'reactions');
      qb.groupBy('posts.id');
      qb.select(
        `posts.id as id, posts.userId as userId, posts.title as title, posts.description as description, posts.image as image, sum(case reaction when 'LIKE' then 1 else 0 end) as raiting`,
      );
      qb.orderBy('raiting', 'DESC');
      const posts = await qb.execute();
      return posts;
    }

    if (postPaginationDto.tag) {
      const tagRepo = getRepository(TagEntity);
      const tag = await tagRepo.findOne({
        where: { tagName: postPaginationDto.tag },
        relations: ['posts'],
      });

      const ids = tag.posts.map((post) => post.id);

      if (ids.length > 0) {
        qb.andWhere('posts.id IN (:...ids)', { ids });
      } else {
        qb.andWhere('1=0');
      }
    }

    qb.orderBy('posts.createdAt', 'DESC');

    return qb.getMany();
  }
}
