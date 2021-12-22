import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikePostModel {
  @Field(() => Int, { description: 'Id of the Like' })
  id: number;

  @Field(() => Int, { description: 'UserId of the Like' })
  userId: number;

  @Field(() => Int, { description: 'PostId of the Like' })
  postId: number;
}
