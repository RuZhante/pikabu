import { Field, InputType, Int } from '@nestjs/graphql';
import { ReactionType } from '../types/reaction.types';

@InputType()
export class ReactionCommentDto {
  @Field(() => Int, { description: 'CommentId of the reaction' })
  commentId: number;

  @Field(() => ReactionType, { description: 'Type of the reaction' })
  reaction: ReactionType;
}
