import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { Starship } from './starship.model';
import { mapStarshipData } from './starships.mapper';
import { StarshipsFilterInput } from './starships.filter.input';
import { getIdFromUrl } from '../common/utils';

@Injectable()
export class StarshipsService {
  private readonly apiUrl = 'https://swapi.dev/api/starships';

  constructor(private readonly cacheService: CacheService) {}

  async getAllStarships(
    filter?: StarshipsFilterInput,
    page?: number,
  ): Promise<Starship[]> {
    const cacheKey = page
      ? `starships_page_${page}_${JSON.stringify(filter || {})}`
      : `all_starships_${JSON.stringify(filter || {})}`;

    const cachedData = await this.cacheService.get<Starship[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let id: string;
    if (page) {
      const response = await axios.get(`${this.apiUrl}?page=${page}`);
      id = getIdFromUrl(this.apiUrl);
      const starships = response.data.results.map(mapStarshipData, id);
      const filteredStarships = this.applyFilters(starships, filter);

      await this.cacheService.set(cacheKey, filteredStarships, 86400);
      return filteredStarships;
    } else {
      let nextUrl: string | null = this.apiUrl;
      const starships: Starship[] = [];

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        id = getIdFromUrl(nextUrl);
        starships.push(...response.data.results.map(mapStarshipData, id));
        nextUrl = response.data.next;
      }

      const filteredResults = this.applyFilters(starships, filter);
      await this.cacheService.set(cacheKey, filteredResults, 86400);
      return filteredResults;
    }
  }

  async getStarshipById(id: string): Promise<Starship> {
    const cacheKey = `starship_${id}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return cachedData as Starship;
    }

    const response = await axios.get(`${this.apiUrl}/${id}`);
    const starship = mapStarshipData(response.data, id);
    await this.cacheService.set(cacheKey, starship, 86400);

    return starship;
  }

  private applyFilters(
    data: Starship[],
    filters: StarshipsFilterInput,
  ): Starship[] {
    if (!filters) return data;
    return data.filter((item) =>
      Object.keys(filters).every((key) =>
        filters[key] ? String(item[key]).includes(filters[key]) : true,
      ),
    );
  }
}
