import { Query, Resolver } from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { Species } from './species.model';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly speciesService: SpeciesService) {}

  @Query(() => [Species])
  getSpecies(): Species[] {
    return this.speciesService.getAllSpecies();
  }
}
