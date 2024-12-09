import { Query, Resolver, Args } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { Film } from './film.model';
import { FilterInput } from './films.filter.input';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private readonly filmsService: FilmsService) {}

  @Query(() => [Film])
  async getFilms(
    @Args('filter', { nullable: true }) filter?: FilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Film[]> {
    return await this.filmsService.getAllFilms(filter, page);
  }

  @Query(() => Film)
  async getFilmById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Film> {
    return await this.filmsService.getFilmById(id);
  }
}
