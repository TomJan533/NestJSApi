import { Field, ObjectType } from '@nestjs/graphql';
import { WordCount } from '../common/dto/word-count.dto';

@ObjectType()
export class Film {
  @Field()
  id: string;

  @Field()
  episodeId: string;

  @Field()
  title: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  releaseDate: string;

  @Field()
  openingCrawl: string;

  @Field(() => [String])
  characters: string[];

  @Field(() => [String])
  planets: string[];

  @Field(() => [String])
  starships: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field(() => [String])
  species: string[];

  @Field(() => [WordCount], {
    description: 'Word counts from the opening crawl',
  })
  wordCounts: WordCount[];
}
