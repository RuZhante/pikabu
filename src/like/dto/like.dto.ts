import { InputType } from '@nestjs/graphql';

@InputType()
export class LikeDto {
  userId: number;

  postId: number;
}
