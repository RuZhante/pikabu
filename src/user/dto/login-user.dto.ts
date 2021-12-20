import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Username of the user' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Username of the user' })
  password: string;
}
