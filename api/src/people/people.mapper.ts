import { People } from './people.model';

export const mapPeopleData = (rawData: any): People => {
  return {
    id: rawData.url.split('/').filter(Boolean).pop() || '', // Extract ID from URL
    name: rawData.name,
    height: rawData.height,
    mass: rawData.mass,
    hairColor: rawData.hair_color,
    skinColor: rawData.skin_color,
    eyeColor: rawData.eye_color,
    birthYear: rawData.birth_year,
    gender: rawData.gender,
    homeworld: rawData.homeworld,
    films: rawData.films,
    species: rawData.species,
    vehicles: rawData.vehicles,
    starships: rawData.starships,
  };
};
