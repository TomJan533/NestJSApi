import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { Species } from './species.model';
import { mapSpeciesData } from './species.mapper';
import { SpeciesFilterInput } from './species.filter.input';
import { getIdFromUrl } from '../common/utils';

@Injectable()
export class SpeciesService {
  private readonly apiUrl = 'https://swapi.dev/api/species';

  constructor(private readonly cacheService: CacheService) {}

  async getAllSpecies(
    filter?: SpeciesFilterInput,
    page?: number,
  ): Promise<Species[]> {
    const cacheKey = page
      ? `species_page_${page}_${JSON.stringify(filter || {})}`
      : `all_species_${JSON.stringify(filter || {})}`;

    const cachedData = await this.cacheService.get<Species[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let id: string;
    if (page) {
      const response = await axios.get(`${this.apiUrl}?page=${page}`);
      id = getIdFromUrl(this.apiUrl);
      const films = response.data.results.map(mapSpeciesData, id);
      const filteredFilms = this.applyFilters(films, filter);

      await this.cacheService.set(cacheKey, filteredFilms, 86400);
      return filteredFilms;
    } else {
      let nextUrl: string | null = this.apiUrl;
      const films: Species[] = [];

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        id = getIdFromUrl(nextUrl);
        films.push(...response.data.results.map(mapSpeciesData, id));
        nextUrl = response.data.next;
      }

      const filteredResults = this.applyFilters(films, filter);
      await this.cacheService.set(cacheKey, filteredResults, 86400);
      return filteredResults;
    }
  }

  async getSpeciesById(id: string): Promise<Species> {
    const cacheKey = `film_${id}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return cachedData as Species;
    }

    const response = await axios.get(`${this.apiUrl}/${id}`);
    const film = mapSpeciesData(response.data, id);
    await this.cacheService.set(cacheKey, film, 86400);

    return film;
  }

  private applyFilters(
    data: Species[],
    filters: SpeciesFilterInput,
  ): Species[] {
    if (!filters) return data;
    return data.filter((item) =>
      Object.keys(filters).every((key) =>
        filters[key] ? String(item[key]).includes(filters[key]) : true,
      ),
    );
  }
}
