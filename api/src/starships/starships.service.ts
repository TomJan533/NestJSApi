import { Injectable } from '@nestjs/common';
import { Starship } from './starship.model';

@Injectable()
export class StarshipsService {
  getAllStarships(): Starship[] {
    return [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ];
  }
}
