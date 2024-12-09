import { Resolver, Query } from '@nestjs/graphql';
import { FilmsStats } from './films-stats.dto';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { FilmsStatsService } from './films-stats.service';

@Resolver()
export class FilmStatsResolver {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly peopleService: PeopleService,
    private readonly filmsStatsService: FilmsStatsService,
  ) {}

  @Query(() => FilmsStats)
  async getFilmsStats(): Promise<FilmsStats> {
    const films = await this.filmsService.getAllFilms();
    const people = await this.peopleService.getAllPeople();

    const aggregatedWordCounts =
      this.filmsStatsService.aggregateWordCounts(films);

    const cleanedNames = this.filmsStatsService.cleanNames(
      people.map((person) => person.name),
    );

    const nameCounts = this.filmsStatsService.calculateNameCounts(
      cleanedNames,
      films,
    );

    const namesWithMaxCount =
      this.filmsStatsService.getNamesWithMaxCount(nameCounts);

    return {
      wordCounts: aggregatedWordCounts,
      namesWithMaxCount,
    };
  }
}
