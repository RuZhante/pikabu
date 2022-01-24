import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TagType } from 'src/tag/types/tag.types';

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

  @Field(() => Int, { description: 'UserId of the Post' })
  userId: number;

  @Field(() => Int, { description: 'Count likes of the Post', nullable: true })
  raiting: number;

  @Field(() => Date, { description: 'Date of the Post created' })
  createdAt: Date;

  @Field(() => Date, { description: 'Date of the Post updated' })
  updatedAt: Date;

  @Field(() => TagType, { description: 'BEST FRESH HOT', nullable: true })
  tagType: TagType;
}
