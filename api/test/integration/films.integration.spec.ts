import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheService } from '../../src/cache/cache.service';

jest.setTimeout(20000);

describe('FilmsModule (integration)', () => {
  let app: INestApplication;
  let cacheService: CacheService;
  let originalConsoleLog: typeof console.log;

  beforeAll(async () => {
    originalConsoleLog = console.log;
    console.log = jest.fn();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CacheService)
      .useValue(new CacheService('films-module-test'))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    cacheService = moduleFixture.get<CacheService>(CacheService);

    if (cacheService) await cacheService.clearNamespace();
  });

  afterAll(async () => {
    if (cacheService) {
      await cacheService.clearNamespace();
      await cacheService.quit();
    }
    if (app) {
      await app.close();
    }

    console.log = originalConsoleLog;
  });

  it('should return films data via GraphQL', async () => {
    const query = `
      query {
        getFilms {
          id
          title
          director
        }
      }
    `;

    const expectedResponse = {
      data: {
        getFilms: [
          { id: '4', title: 'A New Hope', director: 'George Lucas' },
          {
            id: '5',
            title: 'The Empire Strikes Back',
            director: 'Irvin Kershner',
          },
          {
            id: '6',
            title: 'Return of the Jedi',
            director: 'Richard Marquand',
          },
          { id: '1', title: 'The Phantom Menace', director: 'George Lucas' },
          { id: '2', title: 'Attack of the Clones', director: 'George Lucas' },
          { id: '3', title: 'Revenge of the Sith', director: 'George Lucas' },
        ],
      },
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });
});
