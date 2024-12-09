import { ObjectType, Field } from '@nestjs/graphql';
import { WordCount } from './word.count.util';

@ObjectType()
export class FilmStats {
  @Field(() => [WordCount])
  wordCounts: WordCount[]; // List of word counts

  @Field(() => [String])
  namesWithMaxCount: string[]; // List of names with maximum count
}
