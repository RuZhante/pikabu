import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagModel {
  @Field(() => Int, { description: 'Id of the tag' })
  id: number;

  @Field(() => String, { description: 'Name of the tag' })
  tagName: string;
}
