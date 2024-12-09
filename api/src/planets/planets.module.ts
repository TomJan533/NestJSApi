import { Module } from '@nestjs/common';
import { PlanetsResolver } from './planets.resolver';
import { PlanetsService } from './planets.service';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule.register('planets-module')],
  providers: [PlanetsResolver, PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {}
