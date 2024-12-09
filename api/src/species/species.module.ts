import { Module } from '@nestjs/common';
import { SpeciesResolver } from './species.resolver';
import { SpeciesService } from './species.service';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule.register('species-module')],
  providers: [SpeciesResolver, SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
