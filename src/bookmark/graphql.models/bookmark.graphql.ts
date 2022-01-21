import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommentModel } from 'src/comment/graphql.models/comment.graphql';
import { PostModel } from 'src/post/graphql.models/post.graphql';

@ObjectType()
export class BookmarkModel {
  @Field(() => Int, { description: 'Id of the bookmark' })
  id: number;

  @Field(() => Int, { description: 'UserId of the bookmark' })
  userid: number;

  @Field(() => Int, { description: 'PostId of the bookmark', nullable: true })
  postId: number;

  @Field(() => PostModel, { description: 'Post Model', nullable: true })
  post: PostModel;

  @Field(() => Int, {
    description: 'CommentId of the bookmark',
    nullable: true,
  })
  commentId: number;

  @Field(() => CommentModel, { description: 'Comment Model', nullable: true })
  comment: CommentModel;
}
