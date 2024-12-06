import { Injectable } from '@nestjs/common';
import { Planet } from './planet.model';

@Injectable()
export class PlanetsService {
  getAllPlanets(): Planet[] {
    return [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ];
  }
}
