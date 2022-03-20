const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Anime = require('../lib/models/Anime');

describe('animes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates anime', async () => {
    const expected = {
      title: 'Maid-Sama',
      genre: 'shojo',
    };
    const res = await request(app).post('/api/v1/animes').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
