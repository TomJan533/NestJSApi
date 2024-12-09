import { Module } from '@nestjs/common';
import { FilmsStatsService } from './films-stats.service';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { FilmStatsResolver } from './films-stats.resolver';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule.register('films-stats-module')],
  providers: [
    FilmsStatsService,
    FilmsService,
    PeopleService,
    FilmStatsResolver,
  ],
})
export class FilmsStatsModule {}
