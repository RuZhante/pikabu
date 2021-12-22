import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  @Field(() => Int, { description: 'OFFSET' })
  skip?: number;

  @Field(() => Int, { description: 'LIMIT' })
  take?: number;
}
