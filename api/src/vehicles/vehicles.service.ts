import { Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle.model';

@Injectable()
export class VehiclesService {
  getAllVehicles(): Vehicle[] {
    return [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ];
  }
}
