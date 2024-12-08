import { Query, Resolver, Args } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { Film } from './film.model';
import { FilterInput } from './films.filter.input';
import { WordCount } from './word.count.util';
import { PeopleService } from '../people/people.service';
import { cleanName } from '../people/people.clean.name.util';

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

  @Query(() => [WordCount])
  async getFilmsStats(): Promise<WordCount[]> {
    const films = await this.filmsService.getAllFilms();
    const wordCounts = films.flatMap((film) => film.wordCounts);
    const aggregatedCounts: { [word: string]: number } = {};

    wordCounts.forEach(({ word, count }) => {
      aggregatedCounts[word] = (aggregatedCounts[word] || 0) + count;
    });

    const people = await this.peopleService.getAllPeople();
    const cleanedNames = people.map((person) => cleanName(person.name));

    // TODO: Implement names search, sort
    // TODO: Implement result merge
    // TODO: Implement test

    return Object.entries(aggregatedCounts).map(([word, count]) => ({
      word,
      count,
    }));
  }
}
