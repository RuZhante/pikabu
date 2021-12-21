import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResultModel {
  @Field({ nullable: true })
  affected: number;
}
