import { Starship } from './starship.model';

export const mapStarshipData = (rawStarship: any, id: string): Starship => ({
  id: id,
  name: rawStarship.name,
  model: rawStarship.model,
  manufacturer: rawStarship.manufacturer,
  cost_in_credits: rawStarship.cost_in_credits,
  length: rawStarship.length,
  max_atmosphering_speed: rawStarship.max_atmosphering_speed,
  crew: rawStarship.crew,
  passengers: rawStarship.passengers,
  cargo_capacity: rawStarship.cargo_capacity,
  consumables: rawStarship.consumables,
  hyperdrive_rating: rawStarship.hyperdrive_rating,
  MGLT: rawStarship.MGLT,
  starship_class: rawStarship.starship_class,
  pilots: rawStarship.pilots,
  films: rawStarship.films,
  created: rawStarship.created,
  edited: rawStarship.edited,
  url: rawStarship.url,
});
