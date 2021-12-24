import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostBookmarkDto {
  @Field(() => Int, { description: 'PostId of the bookmark' })
  postId: number;
}
