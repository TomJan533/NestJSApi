import { Test, TestingModule } from '@nestjs/testing';
import { FilmsResolver } from '../../src/films/films.resolver';
import { FilmsService } from '../../src/films/films.service';

describe('FilmsResolver', () => {
  let filmsResolver: FilmsResolver;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsResolver, FilmsService],
    }).compile();

    filmsResolver = module.get<FilmsResolver>(FilmsResolver);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should return films data', () => {
    const mockFilms = [
      { id: '1', title: 'A New Hope', director: 'George Lucas' },
      { id: '2', title: 'The Empire Strikes Back', director: 'Irvin Kershner' },
    ];

    jest.spyOn(filmsService, 'getAllFilms').mockReturnValue(mockFilms);

    expect(filmsResolver.getFilms()).toEqual(mockFilms);
  });
});
