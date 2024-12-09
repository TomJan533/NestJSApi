import { Vehicle } from './vehicle.model';

export const mapVehicleData = (rawVehicle: any, id: string): Vehicle => ({
  id: id,
  name: rawVehicle.name,
  model: rawVehicle.model,
  manufacturer: rawVehicle.manufacturer,
  cost_in_credits: rawVehicle.cost_in_credits,
  length: rawVehicle.length,
  max_atmosphering_speed: rawVehicle.max_atmosphering_speed,
  crew: rawVehicle.crew,
  passengers: rawVehicle.passengers,
  cargo_capacity: rawVehicle.cargo_capacity,
  consumables: rawVehicle.consumables,
  vehicle_class: rawVehicle.vehicle_class,
  pilots: rawVehicle.pilots,
  films: rawVehicle.films,
  created: rawVehicle.created,
  edited: rawVehicle.edited,
  url: rawVehicle.url,
});
