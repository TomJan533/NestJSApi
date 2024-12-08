import { Field, ObjectType } from '@nestjs/graphql';
import { WordCount } from './word.count.util';

@ObjectType()
export class Film {
  @Field()
  id: string; // Maps to episode_id from the API

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
