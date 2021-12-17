import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from './create-post.dto';

@InputType()
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Field(() => Int)
  id: number;
}
