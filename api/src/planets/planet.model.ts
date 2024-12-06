import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field()
  id: string;

  @Field()
  name: string;
}
