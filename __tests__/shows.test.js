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

  it('gets showlist', async () => {
    const expected = [
      {
        title: 'Ugly Betty',
        id: '1',
        watch_app: 'Hulu',
      },
      {
        title: 'Peep Show',
        id: '2',
        watch_app: 'Hulu',
      },
    ];
    const res = await request(app).get('/api/v1/shows');

    expect(res.body).toEqual(expected);
  });

  it('get show by id', async () => {
    const expected = {
      title: 'Ugly Betty',
      id: '1',
      watch_app: 'Hulu',
    };
    const res = await request(app).get(`/api/v1/shows/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates show', async () => {
    const show = {
      title: 'Peep Show',
      id: '2',
      watch_app: 'Hulu',
    };

    const res = await request(app)
      .patch(`/api/v1/shows/${show.id}`)
      .send({ title: 'The Office', watch_app: 'Peacock' });

    const expected = {
      id: expect.any(String),
      title: 'The Office',
      watch_app: 'Peacock',
    };
    expect(res.body).toEqual(expected);
    expect(await Show.findById(show.id)).toEqual(expected);
  });

  it('deletes show', async () => {
    const expected = await Show.findById(2);
    const res = await request(app).delete(`/api/v1/shows/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
