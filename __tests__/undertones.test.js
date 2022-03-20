const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('tones routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a tone', async () => {
    const expected = {
      tone: 'warm',
      color: 'red',
    };
    const res = await request(app).post('/api/v1/undertones').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
