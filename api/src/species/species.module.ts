import { Module } from '@nestjs/common';
import { SpeciesResolver } from './species.resolver';
import { SpeciesService } from './species.service';

@Module({
  providers: [SpeciesResolver, SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
