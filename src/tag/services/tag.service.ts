import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/post/post.repository';
import { CreateTagDto } from '../dto/create-tag.dto';
import { PostTagDto } from '../dto/post-tag.dto';
import { TagEntity } from '../tag.entity';
import { TagRepository } from '../tag.repository';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async addTagtoPost(postTagDto: PostTagDto): Promise<TagEntity> {
    const tag = await this.tagRepository.findOneOrFail(postTagDto.tagId);
    const post = await this.postRepository.findOneOrFail(postTagDto.postId, {
      relations: ['tags'],
    });

    const postIsNotHasTag =
      post.tags.findIndex((postTag) => postTag.tagName === tag.tagName) === -1;

    if (postIsNotHasTag) {
      post.tags.push(tag);
      await this.postRepository.save(post);
    }

    const qb = this.tagRepository.createQueryBuilder('tags');
    qb.leftJoinAndSelect('tags.posts', 'posts').where('posts.id IN (:...ids)', {
      ids: [...postTagDto.postId.toString()],
    });

    return qb.getOne();
  }

  async removeTagtoPost(postTagDto: PostTagDto): Promise<TagEntity> {
    const tag = await this.tagRepository.findOneOrFail(postTagDto.tagId);
    const post = await this.postRepository.findOneOrFail(postTagDto.postId, {
      relations: ['tags'],
    });

    const postTagIndex = post.tags.findIndex(
      (postTag) => postTag.tagName === tag.tagName,
    );

    if (postTagIndex >= 0) {
      post.tags.splice(postTagIndex, 1);
      await this.postRepository.save(post);
    }

    return tag;
  }

  async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }
}
