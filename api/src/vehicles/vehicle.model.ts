import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field()
  cost_in_credits: string;

  @Field()
  length: string;

  @Field()
  max_atmosphering_speed: string;

  @Field()
  crew: string;

  @Field()
  passengers: string;

  @Field()
  cargo_capacity: string;

  @Field()
  consumables: string;

  @Field()
  vehicle_class: string;

  @Field(() => [String])
  pilots: string[];

  @Field(() => [String])
  films: string[];

  @Field()
  created: string;

  @Field()
  edited: string;

  @Field()
  url: string;
}
