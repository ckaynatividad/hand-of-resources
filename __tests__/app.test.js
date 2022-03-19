const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates cat', async () => {
    const expected = {
      name: 'Cardamon',
      age: 4,
      type: 'Himalayan',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets cat list', async () => {
    const expected = [
      {
        name: 'Cardamon',
        id: '1',
        age: 4,
        type: 'Himalayan',
      },
      {
        name: 'Bucket',
        id: '2',
        age: 5,
        type: 'Scottish Fold Tabby',
      },
    ];
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });
});
