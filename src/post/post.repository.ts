import { CommentEntity } from 'src/comment/comment.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PostPaginationDto } from './dto/post-pagination.dto';
import { PostEntity } from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async postPagination(
    postPaginationDto: PostPaginationDto,
  ): Promise<PostEntity | PostEntity[]> {
    const qb = this.createQueryBuilder('posts');

    if (postPaginationDto.pagination.skip)
      qb.skip(postPaginationDto.pagination.skip);

    if (postPaginationDto.pagination.take)
      qb.take(postPaginationDto.pagination.take);

    if (postPaginationDto.title)
      qb.andWhere('posts.title = :title', {
        title: postPaginationDto.title,
      });

    if (postPaginationDto.countLikes) {
      qb.select('posts.*')
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(*)')
            .from(ReactionEntity, 'r')
            .where(`posts.id = r.postId AND r.reaction = 'LIKE'`);
        }, 'countr')
        .orderBy('countr', 'DESC');

      return qb.getRawMany();
    }

    if (postPaginationDto.tag) {
      qb.innerJoinAndSelect('posts.tags', 'tags', 'tags.tagName = :tagName', {
        tagName: postPaginationDto.tag,
      });
    }

    if (postPaginationDto.tagType.includes('FRESH')) {
      qb.andWhere(`posts.createdAt >= NOW() - INTERVAL '1 DAY'`);
    }

    if (postPaginationDto.tagType.includes('HOT')) {
      qb.select('posts.*')
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(*)')
            .from(CommentEntity, 'c')
            .where(
              `posts.id = c.postId AND c.createdAt >= NOW() - INTERVAL '1 DAY'`,
            );
        }, 'countr')
        .orderBy('countr', 'DESC');

      return qb.getRawMany();
    }

    if (postPaginationDto.tagType.includes('BEST')) {
      qb.select('posts.*')
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(*)')
            .from(ReactionEntity, 'r')
            .where(
              `posts.id = r.postId AND r.createdAt >= NOW() - INTERVAL '1 DAY' AND r.reaction = 'LIKE'`,
            );
        }, 'countr')
        .orderBy('countr', 'DESC');

      return qb.getRawMany();
    }
    qb.orderBy('posts.createdAt', 'DESC');
    return qb.getMany();
  }
}
