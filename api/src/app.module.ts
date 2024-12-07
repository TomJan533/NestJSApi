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

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    PlanetsModule,
    GraphqlConfigModule,
    CacheModule,
  ],
})
export class AppModule {}
