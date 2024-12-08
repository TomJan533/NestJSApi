import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { PeopleService } from './people.service';

@Module({
  imports: [CacheModule.register('people-module')],
  providers: [PeopleService],
  exports: [PeopleService],
})
export class PeopleModule {}
