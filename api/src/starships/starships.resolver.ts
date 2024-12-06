import { Query, Resolver } from '@nestjs/graphql';
import { StarshipsService } from './starships.service';
import { Starship } from './starship.model';

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Query(() => [Starship])
  getStarships(): Starship[] {
    return this.starshipsService.getAllStarships();
  }
}
