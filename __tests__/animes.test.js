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

  it('gets anime list', async () => {
    const expected = [
      {
        title: 'My Dress-Up Darling',
        id: '1',
        genre: 'shojo',
      },
      {
        title: 'xxxHolic',
        id: '2',
        genre: 'shonen',
      },
    ];
    const res = await request(app).get('/api/v1/animes');

    expect(res.body).toEqual(expected);
  });

  it('gets anime by id', async () => {
    const expected = {
      title: 'My Dress-Up Darling',
      id: '1',
      genre: 'shojo',
    };
    const res = await request(app).get(`/api/v1/animes/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates anime', async () => {
    const anime = {
      title: 'xxxHolic',
      id: '2',
      genre: 'shonen',
    };

    const res = await request(app)
      .patch(`/api/v1/animes/${anime.id}`)
      .send({ title: 'Maid-Sama', genre: 'shojo' });

    const expected = {
      id: expect.any(String),
      title: 'Maid-Sama',
      genre: 'shojo',
    };

    expect(res.body).toEqual(expected);
    expect(await Anime.findById(anime.id)).toEqual(expected);
  });

  it('deletes anime', async () => {
    const expected = await Anime.findById(2);
    const res = await request(app).delete(`/api/v1/animes/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
