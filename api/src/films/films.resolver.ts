import { Query, Resolver } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { Film } from './film.model';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private readonly filmsService: FilmsService) {}

  @Query(() => [Film])
  getFilms(): Film[] {
    return this.filmsService.getAllFilms();
  }
}
