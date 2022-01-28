import { ReactionEntity } from 'src/reaction/reaction.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentPaginationDto } from './dto/comment-pagination.dto';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async commentPagination(
    commentPaginationDto: CommentPaginationDto,
  ): Promise<CommentEntity[]> {
    const qb = this.createQueryBuilder('comments').where(
      'comments.postId = :postId',
      {
        postId: commentPaginationDto.postId,
      },
    );

    if (commentPaginationDto.pagination.skip)
      qb.skip(commentPaginationDto.pagination.skip);

    if (commentPaginationDto.pagination.take)
      qb.take(commentPaginationDto.pagination.take);

    if (commentPaginationDto.countLikes) {
      qb.select('comments.*')
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(*)')
            .from(ReactionEntity, 'r')
            .where(
              `comments.id = r.commentId AND r.reaction = 'LIKE' AND comments.postId = :postId`,
              { postId: commentPaginationDto.postId },
            );
        }, 'countr')
        .orderBy('countr', 'DESC');

      return qb.getRawMany();
    }

    qb.orderBy('comments.createdAt', 'DESC');
    return qb.getMany();
  }
}
