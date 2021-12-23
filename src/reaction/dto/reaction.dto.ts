import { Field, InputType, Int } from '@nestjs/graphql';
import { ReactionType } from '../types/reaction.types';

@InputType()
export class ReactionDto {
  @Field(() => Int, { description: 'UserId of the reaction' })
  postId: number;

  @Field(() => ReactionType, { description: 'Type of the reaction' })
  reaction: ReactionType;
}
