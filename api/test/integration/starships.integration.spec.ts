import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheService } from '../../src/cache/cache.service';

describe('StarshipsModule (integration)', () => {
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
      .useValue(new CacheService('starships-module-test'))
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

  it('should return the first 3 starships data via GraphQL', async () => {
    const query = `
      query {
        getStarships {
          id
          name
        }
      }
    `;

    const expectedFirstThree = [
      { id: '0', name: 'CR90 corvette' },
      { id: '1', name: 'Star Destroyer' },
      { id: '2', name: 'Sentinel-class landing craft' },
    ];

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect((res) => {
        // Check that only the first 3 items are returned
        expect(res.body.data.getStarships.slice(0, 3)).toEqual(
          expectedFirstThree,
        );
      });
  });

  it('should return a starship by id via GraphQL', async () => {
    const query = `
      query {
        getStarshipById(id: "2") {
          id
          name
          model
          manufacturer
        }
      }
    `;

    const expectedResponse = {
      data: {
        getStarshipById: {
          id: '2',
          name: 'CR90 corvette',
          model: 'CR90 corvette',
          manufacturer: 'Corellian Engineering Corporation',
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
