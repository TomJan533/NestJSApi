import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('FilmsModule (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
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
          { id: '1', title: 'A New Hope', director: 'George Lucas' },
          {
            id: '2',
            title: 'The Empire Strikes Back',
            director: 'Irvin Kershner',
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
