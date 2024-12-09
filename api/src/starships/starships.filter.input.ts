import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StarshipsFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  manufacturer?: string;

  @Field({ nullable: true })
  starship_class?: string;
}
