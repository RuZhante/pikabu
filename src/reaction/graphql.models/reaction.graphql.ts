import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReactionModel {
  @Field(() => Int, { description: 'Id of the Reaction' })
  id: number;

  @Field(() => Int, { description: 'UserId of the Reaction' })
  userId: number;

  @Field(() => Int, { description: 'PostId of the Reaction', nullable: true })
  postId: number;

  @Field(() => Int, {
    description: 'CommentId of the Reaction',
    nullable: true,
  })
  commentId: number;

  @Field(() => String, { description: 'Reaction LIKE/DISLIKE' })
  reaction: string;
}
