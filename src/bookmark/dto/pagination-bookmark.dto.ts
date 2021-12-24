import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto } from 'src/common/pagination.dto';

@InputType()
export class PaginationBookmarkDto {
  @Field(() => Boolean, {
    description: 'Post of the bookmark',
    nullable: true,
  })
  post: boolean;

  @Field(() => Boolean, {
    description: 'Comment of the bookmak',
    nullable: true,
  })
  comment: boolean;

  @Field(() => PaginationDto, { description: 'Take/Skip' })
  pagination: PaginationDto;
}
