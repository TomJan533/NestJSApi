import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../../src/films/films.controller';
import { FilmsService } from '../../src/films/films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should return "Hello Films!"', () => {
    jest.spyOn(filmsService, 'getAllFilms').mockReturnValue('Hello Films!');
    expect(filmsController.getAllFilms()).toBe('Hello Films!');
  });
});
