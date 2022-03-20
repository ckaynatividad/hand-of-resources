const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const Undertone = require('../lib/models/Undertone');
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

  it('gets tone by id', async () => {
    const expected = {
      tone: 'olive',
      color: 'green',
      id: '1',
    };
    const res = await request(app).get(`/api/v1/undertones/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates tone', async () => {
    const undertone = {
      tone: 'cool',
      id: '2',
      color: 'blue',
    };

    const res = await request(app)
      .patch(`/api/v1/undertones/${undertone.id}`)
      .send({ tone: 'neutral', color: 'yellow and blue' });

    const expected = {
      id: expect.any(String),
      tone: 'neutral',
      color: 'yellow and blue',
    };

    expect(res.body).toEqual(expected);
    expect(await Undertone.findById(undertone.id)).toEqual(expected);
  });

  it('deletes undertones', async () => {
    const expected = await Undertone.findById(2);
    const res = await request(app).delete(`/api/v1/undertones/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
