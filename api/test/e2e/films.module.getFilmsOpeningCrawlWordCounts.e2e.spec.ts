import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheService } from '../../src/cache/cache.service';

describe('FilmsModule (e2e) - getFilmsOpeningCrawlWordCounts', () => {
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

  it('should return aggregated word counts from films opening crawls', async () => {
    const query = `
      query {
        getFilmsOpeningCrawlWordCounts {
          word
          count
        }
      }
    `;

    const expectedFirstItems = [
      { word: 'it', count: 3 },
      { word: 'is', count: 7 },
      { word: 'a', count: 9 },
    ];

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    // Assert that the first three items in the response match the expected items
    expect(
      response.body.data.getFilmsOpeningCrawlWordCounts.slice(0, 3),
    ).toEqual(expectedFirstItems);
  });
});
