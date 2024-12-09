import { Query, Resolver, Args } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { Film } from './film.model';
import { FilterInput } from './films.filter.input';
import { PeopleService } from '../people/people.service';
import { cleanName } from '../people/people.clean.name.util';
import { FilmStats } from './film.stats.model';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  @Query(() => [Film])
  async getFilms(
    @Args('filter', { nullable: true }) filter?: FilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Film[]> {
    return await this.filmsService.getAllFilms(filter, page);
  }

  @Query(() => FilmStats)
  async getFilmsStats(): Promise<FilmStats> {
    const films = await this.filmsService.getAllFilms();
    const people = await this.peopleService.getAllPeople();

    const wordCounts = films.flatMap((film) => film.wordCounts);
    const aggregatedCounts: { [word: string]: number } = {};

    wordCounts.forEach(({ word, count }) => {
      aggregatedCounts[word] = (aggregatedCounts[word] || 0) + count;
    });

    const aggregatedWordCounts = Object.entries(aggregatedCounts).map(
      ([word, count]) => ({
        word,
        count,
      }),
    );

    const cleanedNames = people.map((person) => cleanName(person.name));
    const openingCrawls = films.map((film) => film.openingCrawl);

    const nameCounts: { [name: string]: number } = {};

    cleanedNames.forEach((name) => {
      const count = openingCrawls.reduce((acc, crawl) => {
        const regex = new RegExp(`\\b${name}\\b`, 'gi'); // Match whole words, case-insensitive
        const matches = crawl.match(regex);
        return acc + (matches ? matches.length : 0);
      }, 0);

      if (count > 0) {
        nameCounts[name] = count;
      }
    });

    // Find the maximum count
    const maxCount = Math.max(...Object.values(nameCounts));

    // Get all names with the maximum count
    const namesWithMaxCount = Object.entries(nameCounts)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, count]) => count === maxCount) // Filter names with the max count
      .map(([name]) => name); // Extract the names

    return {
      wordCounts: aggregatedWordCounts,
      namesWithMaxCount,
    };
  }
}
