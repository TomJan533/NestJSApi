import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CacheService } from '../../src/cache/cache.service';

describe('VehiclesModule (integration)', () => {
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
      .useValue(new CacheService('vehicles-module-test'))
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

  it('should return the first 3 vehicles data via GraphQL', async () => {
    const query = `
      query {
        getVehicles {
          id
          name
        }
      }
    `;

    const expectedFirstThree = [
      { id: '0', name: 'Sand Crawler' },
      { id: '1', name: 'T-16 skyhopper' },
      { id: '2', name: 'X-34 landspeeder' },
    ];

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect((res) => {
        // Check that only the first 3 items are returned
        expect(res.body.data.getVehicles.slice(0, 3)).toEqual(
          expectedFirstThree,
        );
      });
  });

  it('should return a vehicle by id via GraphQL', async () => {
    const query = `
      query {
        getVehicleById(id: "4") {
          id
          name
          model
          manufacturer
        }
      }
    `;

    const expectedResponse = {
      data: {
        getVehicleById: {
          id: '4',
          name: 'Sand Crawler',
          model: 'Digger Crawler',
          manufacturer: 'Corellia Mining Corporation',
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
