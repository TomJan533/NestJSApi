import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Starship {
  @Field()
  id: string;

  @Field()
  name: string;
}
