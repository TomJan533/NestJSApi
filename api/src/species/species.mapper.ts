import { Species } from './species.model';

export const mapSpeciesData = (rawSpecies: any, id: string): Species => ({
  id: id,
  name: rawSpecies.name,
  classification: rawSpecies.classification,
  designation: rawSpecies.designation,
  average_height: rawSpecies.average_height,
  skin_colors: rawSpecies.skin_colors,
  hair_colors: rawSpecies.hair_colors,
  eye_colors: rawSpecies.eye_colors,
  average_lifespan: rawSpecies.average_lifespan,
  homeworld: rawSpecies.homeworld,
  language: rawSpecies.language,
  people: rawSpecies.people,
  films: rawSpecies.films,
  created: rawSpecies.created,
  edited: rawSpecies.edited,
  url: rawSpecies.url,
});
