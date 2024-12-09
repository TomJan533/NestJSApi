import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { Film } from './film.model';
import { mapFilmData } from './film.mapper';
import { FilterInput } from './films.filter.input';
import { getIdFromUrl } from '../common/utils';

@Injectable()
export class FilmsService {
  private readonly apiUrl = 'https://swapi.dev/api/films';

  constructor(private readonly cacheService: CacheService) {}

  async getAllFilms(filter?: FilterInput, page?: number): Promise<Film[]> {
    const cacheKey = page
      ? `films_page_${page}_${JSON.stringify(filter || {})}`
      : `all_films_${JSON.stringify(filter || {})}`;

    const cachedData = await this.cacheService.get<Film[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let id: string;
    if (page) {
      const response = await axios.get(`${this.apiUrl}?page=${page}`);
      id = getIdFromUrl(this.apiUrl);
      const films = response.data.results.map(mapFilmData, id);
      const filteredFilms = this.applyFilters(films, filter);

      await this.cacheService.set(cacheKey, filteredFilms, 86400);
      return filteredFilms;
    } else {
      let nextUrl: string | null = this.apiUrl;
      const films: Film[] = [];

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        id = getIdFromUrl(nextUrl);
        films.push(...response.data.results.map(mapFilmData, id));
        nextUrl = response.data.next;
      }

      const filteredResults = this.applyFilters(films, filter);
      await this.cacheService.set(cacheKey, filteredResults, 86400);
      return filteredResults;
    }
  }

  async getFilmById(id: string): Promise<Film> {
    const cacheKey = `film_${id}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return cachedData as Film;
    }

    const response = await axios.get(`${this.apiUrl}/${id}`);
    const film = mapFilmData(response.data, id);
    await this.cacheService.set(cacheKey, film, 86400);

    return film;
  }

  private applyFilters(data: Film[], filters: FilterInput): Film[] {
    if (!filters) return data;
    return data.filter((item) =>
      Object.keys(filters).every((key) =>
        filters[key] ? String(item[key]).includes(filters[key]) : true,
      ),
    );
  }
}
