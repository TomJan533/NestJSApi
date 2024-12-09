import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class VehiclesFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  manufacturer?: string;

  @Field({ nullable: true })
  vehicle_class?: string;
}
