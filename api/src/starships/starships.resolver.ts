import { Query, Resolver, Args } from '@nestjs/graphql';
import { StarshipsService } from './starships.service';
import { Starship } from './starship.model';
import { StarshipsFilterInput } from './starships.filter.input';

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Query(() => [Starship])
  async getStarships(
    @Args('filter', { nullable: true }) filter?: StarshipsFilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Starship[]> {
    return await this.starshipsService.getAllStarships(filter, page);
  }

  @Query(() => Starship)
  async getStarshipById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Starship> {
    return await this.starshipsService.getStarshipById(id);
  }
}
