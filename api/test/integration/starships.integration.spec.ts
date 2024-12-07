import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('StarshipsModule (integration)', () => {
  let app: INestApplication;
  let originalConsoleLog: typeof console.log;

  beforeAll(async () => {
    originalConsoleLog = console.log;
    console.log = jest.fn();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    console.log = originalConsoleLog;
  });

  it('should return Starships data via GraphQL', async () => {
    const query = `
      query {
        getStarships {
          id
          name
        }
      }
    `;

    const expectedResponse = {
      data: {
        getStarships: [
          { id: '1', name: 'A' },
          {
            id: '2',
            name: 'B',
          },
        ],
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
