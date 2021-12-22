import { Field, InputType, Int } from '@nestjs/graphql';
import { PaginationDto } from 'src/common/pagination.dto';

@InputType()
export class CommentPaginationDto {
  @Field(() => PaginationDto, { description: 'OFFSET and LIMIT' })
  pagination: PaginationDto;

  @Field(() => Int, { description: 'PostId of the comment' })
  postId: number;
}
