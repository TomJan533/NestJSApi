import { Controller, Get } from '@nestjs/common';

@Controller('vehicles')
export class VehiclesController {
  @Get()
  getAllVehicles(): string {
    return 'Hello Vehicles!';
  }
}
