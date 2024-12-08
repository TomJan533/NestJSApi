import { Query, Resolver, Args } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { Film } from './film.model';
import { FilterInput } from './films.filter.input';
import { WordCount } from './word.count.util';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private readonly filmsService: FilmsService) {}

  @Query(() => [Film])
  async getFilms(
    @Args('filter', { nullable: true }) filter?: FilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Film[]> {
    return await this.filmsService.getAllFilms(filter, page);
  }

  @Query(() => [WordCount])
  async getFilmsOpeningCrawlWordCounts(): Promise<WordCount[]> {
    const films = await this.filmsService.getAllFilms();
    const wordCounts = films.flatMap((film) => film.wordCounts);
    const aggregatedCounts: { [word: string]: number } = {};

    wordCounts.forEach(({ word, count }) => {
      aggregatedCounts[word] = (aggregatedCounts[word] || 0) + count;
    });

    return Object.entries(aggregatedCounts).map(([word, count]) => ({
      word,
      count,
    }));
  }
}
