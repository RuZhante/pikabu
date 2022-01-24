import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostModel } from 'src/post/graphql.models/post.graphql';
import { TagService } from '../tag.service';

@ObjectType()
export class TagModel {
  constructor(private readonly tagService: TagService) {}
  @Field(() => Int, { description: 'Id of the tag' })
  id: number;

  @Field(() => String, { description: 'Name of the tag' })
  tagName: string;

  @Field(() => [PostModel], {
    description: 'Post with this tag',
    nullable: true,
  })
  posts: PostModel[];
}
