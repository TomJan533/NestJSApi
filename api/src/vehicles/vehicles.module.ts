import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule.register('vehicles-module')],
  providers: [VehiclesService, VehiclesResolver],
  exports: [VehiclesService],
})
export class VehiclesModule {}
