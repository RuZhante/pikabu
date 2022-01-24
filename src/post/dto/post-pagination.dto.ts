import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto } from 'src/common/pagination.dto';
import { TagType } from 'src/tag/types/tag.types';

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

  @Field(() => TagType, { description: 'HOT FRESH BEST', nullable: true })
  tagType: TagType;
}
