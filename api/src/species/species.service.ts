import { Injectable } from '@nestjs/common';
import { Species } from './species.model';

@Injectable()
export class SpeciesService {
  getAllSpecies(): Species[] {
    return [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ];
  }
}
