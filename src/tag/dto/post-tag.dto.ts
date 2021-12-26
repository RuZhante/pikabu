import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostTagDto {
  @Field(() => Int, { description: 'PostId of the Post' })
  postId: number;

  @Field(() => Int, { description: 'TagId of the Tag' })
  tagId: number;
}
