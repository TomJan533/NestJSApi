import { Module } from '@nestjs/common';
import { FilmsResolver } from './films.resolver';
import { FilmsService } from './films.service';
import { CacheModule } from '../cache/cache.module';
import { PeopleService } from '../people/people.service';

@Module({
  imports: [CacheModule.register('films-module')],
  providers: [FilmsResolver, FilmsService, PeopleService],
  exports: [FilmsService],
})
export class FilmsModule {}
