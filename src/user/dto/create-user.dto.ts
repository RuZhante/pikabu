import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String, { description: 'Username of the user' })
  username: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
