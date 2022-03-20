const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Show = require('../lib/models/Show');

describe('shows routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates show', async () => {
    const expected = {
      title: 'Its Always Sunny In Philadelphia',
      watch_app: 'Hulu',
    };
    const res = await request(app).post('/api/v1/shows').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
