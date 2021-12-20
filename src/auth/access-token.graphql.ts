import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenModel {
  @Field(() => String, { description: 'Access Token' })
  access_token: string;
}
