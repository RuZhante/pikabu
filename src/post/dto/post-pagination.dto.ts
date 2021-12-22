import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto } from 'src/common/pagination.dto';

@InputType()
export class PostPaginationDto {
  @Field(() => PaginationDto, { description: 'OFFSET and LIMIT' })
  pagination: PaginationDto;

  @Field(() => String, { description: 'Title of the post', nullable: true })
  title?: string;
}