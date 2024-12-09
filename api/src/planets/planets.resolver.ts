import { Query, Resolver, Args } from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.model';
import { PlanetsFilterInput } from './planets.filter.input';

@Resolver(() => Planet)
export class PlanetsResolver {
  constructor(private readonly planetsService: PlanetsService) {}

  @Query(() => [Planet])
  async getPlanets(
    @Args('filter', { nullable: true }) filter?: PlanetsFilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Planet[]> {
    return await this.planetsService.getAllPlanets(filter, page);
  }

  @Query(() => Planet)
  async getPlanetById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Planet> {
    return await this.planetsService.getPlanetById(id);
  }
}
