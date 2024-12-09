import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { Planet } from './planet.model';
import { mapPlanetData } from './planet.mapper';
import { PlanetsFilterInput } from './planets.filter.input';
import { getIdFromUrl } from '../common/utils';

@Injectable()
export class PlanetsService {
  private readonly apiUrl = 'https://swapi.dev/api/planets';

  constructor(private readonly cacheService: CacheService) {}

  async getAllPlanets(
    filter?: PlanetsFilterInput,
    page?: number,
  ): Promise<Planet[]> {
    const cacheKey = page
      ? `planets_page_${page}_${JSON.stringify(filter || {})}`
      : `all_planets_${JSON.stringify(filter || {})}`;

    const cachedData = await this.cacheService.get<Planet[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let id: string;
    if (page) {
      const response = await axios.get(`${this.apiUrl}?page=${page}`);
      id = getIdFromUrl(this.apiUrl);
      const planets = response.data.results.map(mapPlanetData, id);
      const filteredPlanets = this.applyFilters(planets, filter);

      await this.cacheService.set(cacheKey, filteredPlanets, 86400);
      return filteredPlanets;
    } else {
      let nextUrl: string | null = this.apiUrl;
      const planets: Planet[] = [];

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        id = getIdFromUrl(nextUrl);
        planets.push(...response.data.results.map(mapPlanetData, id));
        nextUrl = response.data.next;
      }

      const filteredResults = this.applyFilters(planets, filter);
      await this.cacheService.set(cacheKey, filteredResults, 86400);
      return filteredResults;
    }
  }

  async getPlanetById(id: string): Promise<Planet> {
    const cacheKey = `planet_${id}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return cachedData as Planet;
    }

    const response = await axios.get(`${this.apiUrl}/${id}`);
    const planet = mapPlanetData(response.data, id);
    await this.cacheService.set(cacheKey, planet, 86400);

    return planet;
  }

  private applyFilters(data: Planet[], filters: PlanetsFilterInput): Planet[] {
    if (!filters) return data;
    return data.filter((item) =>
      Object.keys(filters).every((key) =>
        filters[key] ? String(item[key]).includes(filters[key]) : true,
      ),
    );
  }
}
