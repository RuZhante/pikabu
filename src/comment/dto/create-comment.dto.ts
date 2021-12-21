import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field(() => String, { description: 'Text of the comment' })
  text: string;

  @Field(() => String, { description: 'Image of the comment', nullable: true })
  image: string;

  @Field(() => Int, { description: 'PostId of the comment' })
  postId: number;
}
