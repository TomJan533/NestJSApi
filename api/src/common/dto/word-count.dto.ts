import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class WordCount {
  @Field()
  word: string;

  @Field()
  count: number;
}
