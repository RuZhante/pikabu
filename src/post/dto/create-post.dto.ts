import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Description of the post' })
  description: string;

  @Field(() => String, { description: 'Image of the post' })
  image: string;
}
