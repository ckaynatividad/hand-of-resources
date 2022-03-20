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

  it('gets tonelist', async () => {
    const expected = [
      {
        tone: 'olive',
        color: 'green',
        id: '1',
      },
      {
        tone: 'cool',
        color: 'blue',
        id: '2',
      },
    ];
    const res = await request(app).get('/api/v1/undertones');

    expect(res.body).toEqual(expected);
  });
});
