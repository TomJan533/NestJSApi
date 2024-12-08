import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class People {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  height: string;

  @Field()
  mass: string;

  @Field()
  hairColor: string;

  @Field()
  skinColor: string;

  @Field()
  eyeColor: string;

  @Field()
  birthYear: string;

  @Field()
  gender: string;

  @Field()
  homeworld: string;

  @Field(() => [String])
  films: string[];

  @Field(() => [String])
  species: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field(() => [String])
  starships: string[];
}
