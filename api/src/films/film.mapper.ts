import { Film } from './film.model';

export const mapFilmData = (rawFilm: any): Film => ({
  id: rawFilm.episode_id.toString(),
  title: rawFilm.title,
  director: rawFilm.director,
  producer: rawFilm.producer,
  releaseDate: rawFilm.release_date,
  openingCrawl: rawFilm.opening_crawl,
  characters: rawFilm.characters,
  planets: rawFilm.planets,
  starships: rawFilm.starships,
  vehicles: rawFilm.vehicles,
  species: rawFilm.species,
});
