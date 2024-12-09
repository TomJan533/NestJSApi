import { ObjectType, Field } from '@nestjs/graphql';
import { WordCount } from '../common/dto/word-count.dto';

@ObjectType()
export class FilmsStats {
  @Field(() => [WordCount])
  wordCounts: WordCount[];

  @Field(() => [String])
  namesWithMaxCount: string[];
}
