import { Planet } from './planet.model';

export const mapPlanetData = (rawPlanet: any, id: string): Planet => ({
  id: id,
  name: rawPlanet.name,
  rotation_period: rawPlanet.rotation_period,
  orbital_period: rawPlanet.orbital_period,
  diameter: rawPlanet.diameter,
  climate: rawPlanet.climate,
  gravity: rawPlanet.gravity,
  terrain: rawPlanet.terrain,
  surface_water: rawPlanet.surface_water,
  population: rawPlanet.population,
  residents: rawPlanet.residents,
  films: rawPlanet.films,
  created: rawPlanet.created,
  edited: rawPlanet.edited,
  url: rawPlanet.url,
});
