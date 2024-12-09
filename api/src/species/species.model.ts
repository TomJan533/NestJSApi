import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  classification: string;

  @Field()
  designation: string;

  @Field()
  average_height: string;

  @Field()
  skin_colors: string;

  @Field()
  hair_colors: string;

  @Field()
  eye_colors: string;

  @Field()
  average_lifespan: string;

  @Field({ nullable: true })
  homeworld: string;

  @Field()
  language: string;

  @Field(() => [String])
  people: string[];

  @Field(() => [String])
  films: string[];

  @Field()
  created: string;

  @Field()
  edited: string;

  @Field()
  url: string;
}
