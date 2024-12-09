import { Test, TestingModule } from '@nestjs/testing';
import { FilmsResolver } from '../../src/films/films.resolver';
import { FilmsService } from '../../src/films/films.service';
import { CacheService } from '../../src/cache/cache.service';
import { Film } from '../../src/films/film.model';
import { PeopleService } from '../../src/people/people.service';

describe('FilmsResolver', () => {
  let filmsResolver: FilmsResolver;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const mockCacheService = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsResolver,
        FilmsService,
        PeopleService,
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    filmsResolver = module.get<FilmsResolver>(FilmsResolver);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should return films data', async () => {
    const mockFilms: Film[] = [
      {
        id: '1',
        episodeId: '4',
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        releaseDate: '1977-05-25',
        openingCrawl: 'It is a period of civil war...',
        characters: ['https://swapi.dev/api/people/1/'],
        planets: ['https://swapi.dev/api/planets/1/'],
        starships: ['https://swapi.dev/api/starships/2/'],
        vehicles: ['https://swapi.dev/api/vehicles/4/'],
        species: ['https://swapi.dev/api/species/1/'],
        wordCounts: [],
      },
      {
        id: '2',
        episodeId: '5',
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz, George Lucas',
        releaseDate: '1980-05-17',
        openingCrawl: 'It is a dark time for the Rebellion...',
        characters: ['https://swapi.dev/api/people/2/'],
        planets: ['https://swapi.dev/api/planets/2/'],
        starships: ['https://swapi.dev/api/starships/3/'],
        vehicles: ['https://swapi.dev/api/vehicles/6/'],
        species: ['https://swapi.dev/api/species/2/'],
        wordCounts: [],
      },
    ];

    jest.spyOn(filmsService, 'getAllFilms').mockResolvedValue(mockFilms);

    const result = await filmsResolver.getFilms();
    expect(result).toEqual(mockFilms);
  });
});
