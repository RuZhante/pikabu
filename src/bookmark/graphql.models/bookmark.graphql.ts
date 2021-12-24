import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookmarkModel {
  @Field(() => Int, { description: 'Id of the bookmark' })
  id: number;

  @Field(() => Int, { description: 'UserId of the bookmark' })
  userid: number;

  @Field(() => Int, { description: 'PostId of the bookmark', nullable: true })
  postId: number;

  @Field(() => Int, {
    description: 'CommentId of the bookmark',
    nullable: true,
  })
  commentId: number;
}
