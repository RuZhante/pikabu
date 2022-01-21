import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTagDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Field(() => String, { description: 'Tag Name' })
  tagName: string;
}
