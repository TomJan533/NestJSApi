import { Query, Resolver, Args } from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { Species } from './species.model';
import { SpeciesFilterInput } from './species.filter.input';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly speciesService: SpeciesService) {}

  @Query(() => [Species])
  async getSpecies(
    @Args('filter', { nullable: true }) filter?: SpeciesFilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Species[]> {
    return await this.speciesService.getAllSpecies(filter, page);
  }

  @Query(() => Species)
  async getSpeciesById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Species> {
    return await this.speciesService.getSpeciesById(id);
  }
}
