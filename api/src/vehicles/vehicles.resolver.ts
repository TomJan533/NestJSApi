import { Query, Resolver } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.model';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  getVehicles(): Vehicle[] {
    return this.vehiclesService.getAllVehicles();
  }
}
