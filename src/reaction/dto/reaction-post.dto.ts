import { Field, InputType, Int } from '@nestjs/graphql';
import { ReactionType } from '../types/reaction.types';

@InputType()
export class ReactionPostDto {
  @Field(() => Int, { description: 'PostId of the reaction' })
  postId: number;

  @Field(() => ReactionType, { description: 'Type of the reaction' })
  reaction: ReactionType;
}
