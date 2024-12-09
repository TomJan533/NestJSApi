import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { Vehicle } from './vehicle.model';
import { mapVehicleData } from './vehicles.mapper';
import { VehiclesFilterInput } from './vehicles.filter.input';
import { getIdFromUrl } from '../common/utils';

@Injectable()
export class VehiclesService {
  private readonly apiUrl = 'https://swapi.dev/api/vehicles';

  constructor(private readonly cacheService: CacheService) {}

  async getAllVehicles(
    filter?: VehiclesFilterInput,
    page?: number,
  ): Promise<Vehicle[]> {
    const cacheKey = page
      ? `vehicles_page_${page}_${JSON.stringify(filter || {})}`
      : `all_vehicles_${JSON.stringify(filter || {})}`;

    const cachedData = await this.cacheService.get<Vehicle[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let id: string;
    if (page) {
      const response = await axios.get(`${this.apiUrl}?page=${page}`);
      id = getIdFromUrl(this.apiUrl);
      const vehicles = response.data.results.map(mapVehicleData, id);
      const filteredVehicles = this.applyFilters(vehicles, filter);

      await this.cacheService.set(cacheKey, filteredVehicles, 86400);
      return filteredVehicles;
    } else {
      let nextUrl: string | null = this.apiUrl;
      const vehicles: Vehicle[] = [];

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        id = getIdFromUrl(nextUrl);
        vehicles.push(...response.data.results.map(mapVehicleData, id));
        nextUrl = response.data.next;
      }

      const filteredResults = this.applyFilters(vehicles, filter);
      await this.cacheService.set(cacheKey, filteredResults, 86400);
      return filteredResults;
    }
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const cacheKey = `vehicle_${id}`;
    const cachedData = await this.cacheService.get(cacheKey);

    if (cachedData) {
      return cachedData as Vehicle;
    }

    const response = await axios.get(`${this.apiUrl}/${id}`);
    const vehicle = mapVehicleData(response.data, id);
    await this.cacheService.set(cacheKey, vehicle, 86400);

    return vehicle;
  }

  private applyFilters(
    data: Vehicle[],
    filters: VehiclesFilterInput,
  ): Vehicle[] {
    if (!filters) return data;
    return data.filter((item) =>
      Object.keys(filters).every((key) =>
        filters[key] ? String(item[key]).includes(filters[key]) : true,
      ),
    );
  }
}
