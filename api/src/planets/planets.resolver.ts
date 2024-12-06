import { Query, Resolver } from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.model';

@Resolver(() => Planet)
export class PlanetsResolver {
  constructor(private readonly planetsService: PlanetsService) {}

  @Query(() => [Planet])
  getPlanets(): Planet[] {
    return this.planetsService.getAllPlanets();
  }
}
