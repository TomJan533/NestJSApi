import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  director?: string;

  @Field({ nullable: true })
  producer?: string;

  @Field({ nullable: true })
  releaseDate?: string;
}
