import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommentBookmarkDto {
  @Field(() => Int, { description: 'CommentId of the bookmark' })
  commentId: number;
}
