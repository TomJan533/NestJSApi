import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PlanetsFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  climate?: string;

  @Field({ nullable: true })
  terrain?: string;

  @Field({ nullable: true })
  population?: string;

  @Field({ nullable: true })
  gravity?: string;
}
