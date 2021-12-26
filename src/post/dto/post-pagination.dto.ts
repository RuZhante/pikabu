import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto } from 'src/common/pagination.dto';

@InputType()
export class PostPaginationDto {
  @Field(() => PaginationDto, { description: 'OFFSET and LIMIT' })
  pagination: PaginationDto;

  @Field(() => String, { description: 'Title of the post', nullable: true })
  title?: string;

  @Field(() => Boolean, {
    description: 'Count likes of the post',
    nullable: true,
  })
  countLikes?: boolean;

  @Field(() => String, { description: 'TagName of the tag', nullable: true })
  tag: string;
}
