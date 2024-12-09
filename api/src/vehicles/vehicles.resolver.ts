import { Query, Resolver, Args } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.model';
import { VehiclesFilterInput } from './vehicles.filter.input';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  async getVehicles(
    @Args('filter', { nullable: true }) filter?: VehiclesFilterInput,
    @Args('page', { nullable: true, type: () => Number }) page?: number,
  ): Promise<Vehicle[]> {
    return await this.vehiclesService.getAllVehicles(filter, page);
  }

  @Query(() => Vehicle)
  async getVehicleById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Vehicle> {
    return await this.vehiclesService.getVehicleById(id);
  }
}
