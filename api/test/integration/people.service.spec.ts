import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from '../../src/people/people.service';
import { CacheService } from '../../src/cache/cache.service';

describe('PeopleService (Integration)', () => {
  let service: PeopleService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(() => null), // Simulate empty cache
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = testingModule.get<PeopleService>(PeopleService);
    cacheService = testingModule.get<CacheService>(CacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all people from the API and save to cache', async () => {
    const result = await service.getAllPeople();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);

    const firstPerson = result[0];
    expect(firstPerson).toHaveProperty('id');
    expect(firstPerson).toHaveProperty('name');
    expect(firstPerson).toHaveProperty('height');
    expect(firstPerson).toHaveProperty('mass');
    expect(firstPerson).toHaveProperty('homeworld');
    expect(firstPerson).toHaveProperty('films');
    expect(firstPerson.films).toBeInstanceOf(Array);

    // Validate cache interactions
    expect(cacheService.set).toHaveBeenCalledWith(
      'all_people',
      expect.any(Array),
      86400,
    );
  });
});
