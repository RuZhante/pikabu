import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field(() => Int, { description: 'Id of the Post' })
  id: number;

  @Field(() => String, { description: 'Title of the Post' })
  title: string;

  @Field(() => String, { description: 'Description of the Post' })
  description: string;

  @Field(() => String, { description: 'Image of the Post', nullable: true })
  image: string;

  @Field(() => Int, { description: 'Tag of the Post', nullable: true })
  tag: number;

  @Field(() => Int, { description: 'UserId of the Post' })
  userId: number;
}
