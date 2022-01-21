import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/post.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { PostTagDto } from './dto/post-tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async addTagtoPost(postTagDto: PostTagDto): Promise<TagEntity> {
    const tag = await this.tagRepository.findOneOrFail(postTagDto.tagId);
    const postRepo = getRepository(PostEntity);
    const post = await postRepo.findOneOrFail(postTagDto.postId, {
      relations: ['tags'],
    });

    const postIsNotHasTag =
      post.tags.findIndex((postTag) => postTag.tagName === tag.tagName) === -1;

    if (postIsNotHasTag) {
      post.tags.push(tag);
      await postRepo.save(post);
    }

    return tag;
  }

  async removeTagtoPost(postTagDto: PostTagDto): Promise<TagEntity> {
    const tag = await this.tagRepository.findOneOrFail(postTagDto.tagId);
    const postRepo = getRepository(PostEntity);
    const post = await postRepo.findOneOrFail(postTagDto.postId, {
      relations: ['tags'],
    });

    const postTagIndex = post.tags.findIndex(
      (postTag) => postTag.tagName === tag.tagName,
    );

    if (postTagIndex >= 0) {
      post.tags.splice(postTagIndex, 1);
      await postRepo.save(post);
    }

    return tag;
  }

  async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }
}
