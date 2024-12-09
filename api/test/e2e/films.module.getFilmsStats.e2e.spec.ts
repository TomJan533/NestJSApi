import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheService } from '../../src/cache/cache.service';

jest.setTimeout(40000);

describe('FilmsModule (e2e) - getFilmsStats', () => {
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

  // TODO: test skipped due to timeouts. To be investigated
  it.skip('should return aggregated word counts and names with max count', async () => {
    const query = `
      query {
        getFilmsStats {
          wordCounts {
            word
            count
          }
          namesWithMaxCount
        }
      }
    `;

    const expectedFirstItems = [
      { word: 'it', count: 3 },
      { word: 'is', count: 7 },
      { word: 'a', count: 9 },
    ];

    const expectedNamesWithMaxCount = ['Luke Skywalker', 'Dooku'];

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    // Assert that the first three items in the response match the expected items
    expect(response.body.data.getFilmsStats.wordCounts.slice(0, 3)).toEqual(
      expectedFirstItems,
    );

    // Assert that the names with max count are as expected
    expect(response.body.data.getFilmsStats.namesWithMaxCount).toEqual(
      expectedNamesWithMaxCount,
    );
  });
});
