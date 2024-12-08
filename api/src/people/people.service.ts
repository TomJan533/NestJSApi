import { Injectable } from '@nestjs/common';
import { People } from './people.model';
import { CacheService } from '../cache/cache.service';
import axios from 'axios';
import { mapPeopleData } from './people.mapper';

@Injectable()
export class PeopleService {
  private readonly apiUrl = 'https://swapi.dev/api/people';

  constructor(private readonly cacheService: CacheService) {}

  async getAllPeople(): Promise<People[]> {
    const cacheKey = `all_people`;

    const cachedData = await this.cacheService.get<People[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    let nextUrl: string | null = this.apiUrl;
    const people: People[] = [];

    while (nextUrl) {
      const response = await axios.get(nextUrl);
      people.push(...response.data.results.map(mapPeopleData));
      nextUrl = response.data.next;
    }

    await this.cacheService.set(cacheKey, people, 86400);
    return people;
  }
}
