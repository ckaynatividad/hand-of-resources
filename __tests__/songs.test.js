const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const Song = require('../lib/models/Song');
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

  it('gets song by id', async () => {
    const expected = {
      title: 'Addiction',
      id: '1',
      singer: 'Doja Cat',
    };
    const res = await request(app).get(`/api/v1/songs/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates song', async () => {
    const song = {
      title: 'Eventually',
      id: '2',
      singer: 'Tame Impala',
    };
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ title: 'Lost', singer: 'Frank Ocean' });

    const expected = {
      id: '2',
      title: 'Lost',
      singer: 'Frank Ocean',
    };
    expect(res.body).toEqual(expected);
    expect(await Song.findById(song.id)).toEqual(expected);
  });

  it('deletes song', async () => {
    const expected = await Song.findById(2);
    const res = await request(app).delete(`/api/v1/songs/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
