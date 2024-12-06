import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field()
  id: string;

  @Field()
  name: string;
}
