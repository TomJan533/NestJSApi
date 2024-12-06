import { Injectable } from '@nestjs/common';

@Injectable()
export class VehiclesService {
  getAllVehicles(): string {
    return 'Hello Vehicles!';
  }
}
