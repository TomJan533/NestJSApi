import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';
import { PlanetsModule } from './planets/planets.module';
import { GraphqlConfigModule } from './graphql/graphql.module';
import { CacheModule } from './cache/cache.module';
import { FilmsStatsModule } from './films-stats/films-stats.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    PlanetsModule,
    FilmsStatsModule,
    GraphqlConfigModule,
    CacheModule,
  ],
})
export class AppModule {}
