import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field(() => Int, { description: 'Id of the comment' })
  id: number;

  @Field(() => String, { description: 'Text of the comment' })
  text: string;

  @Field(() => String, { description: 'Image of the comment', nullable: true })
  image: string;

  @Field(() => Int, { description: 'PostId of the comment' })
  postId: number;

  @Field(() => Int, { description: 'UserId of the comment' })
  userId: number;

  @Field(() => Int, {
    description: 'Count likes of the comment',
    nullable: true,
  })
  raiting: number;

  @Field(() => Date, { description: 'Date of the comment created' })
  createdAt: Date;

  @Field(() => Date, { description: 'Date of the comment updated' })
  updatedAt: Date;
}
