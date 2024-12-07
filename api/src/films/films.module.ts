import { Module } from '@nestjs/common';
import { FilmsResolver } from './films.resolver';
import { FilmsService } from './films.service';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule.register('films-module')],
  providers: [FilmsResolver, FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
