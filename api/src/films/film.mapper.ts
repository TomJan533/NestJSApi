import { Film } from './film.model';
import { calculateWordCounts } from './word.count.util';

export const mapFilmData = (rawFilm: any, id: string): Film => ({
  id: id,
  episodeId: rawFilm.episode_id.toString(),
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
  wordCounts: calculateWordCounts(rawFilm.opening_crawl),
});
