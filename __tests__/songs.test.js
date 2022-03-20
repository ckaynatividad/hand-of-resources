const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('songs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a song', async () => {
    const expected = {
      title: 'telepatia',
      singer: 'Kali Uchis',
    };
    const res = await request(app).post('/api/v1/songs').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets songlist', async () => {
    const expected = [
      {
        title: 'Addiction',
        id: '1',
        singer: 'Doja Cat',
      },
      {
        title: 'Eventually',
        id: '2',
        singer: 'Tame Impala',
      },
    ];
    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual(expected);
  });
});
