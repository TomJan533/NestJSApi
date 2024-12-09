import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheService } from '../../src/cache/cache.service';

describe('PlanetsModule (integration)', () => {
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

  it('should return the first 3 planets data via GraphQL', async () => {
    const query = `
      query {
        getPlanets {
          id
          name
        }
      }
    `;

    const expectedFirstThree = [
      { id: '0', name: 'Tatooine' },
      { id: '1', name: 'Alderaan' },
      { id: '2', name: 'Yavin IV' },
    ];

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect((res) => {
        // Check that only the first 3 items are returned
        expect(res.body.data.getPlanets.slice(0, 3)).toEqual(
          expectedFirstThree,
        );
      });
  });

  it('should return a planet by id via GraphQL', async () => {
    const query = `
      query {
        getPlanetById(id: "1") {
          id
          name
          climate
          terrain
        }
      }
    `;

    const expectedResponse = {
      data: {
        getPlanetById: {
          id: '1',
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
        },
      },
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expectedResponse);
      });
  });
});
