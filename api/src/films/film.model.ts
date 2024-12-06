import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  director: string;
}
