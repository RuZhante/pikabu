import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int, { description: 'Id of the user' })
  id: number;

  @Field(() => String, { description: 'Username of the user' })
  username: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
