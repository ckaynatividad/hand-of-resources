const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates cat', async () => {
    const expected = {
      name: 'Cardo',
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

  it('gets cat by id', async () => {
    const expected = {
      name: 'Cardamon',
      id: '1',
      age: 4,
      type: 'Himalayan',
    };
    const res = await request(app).get(`/api/v1/cats/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates cat', async () => {
    const cat = {
      name: 'Cardamon',
      id: '1',
      age: 4,
      type: 'Himalayan',
    };

    const res = await request(app)
      .patch(`/api/v1/cats/${cat.id}`)
      .send({ name: 'Cardo', age: 5, type: 'Siamese' });

    const expected = {
      id: expect.any(String),
      name: 'Cardo',
      age: 5,
      type: 'Siamese',
    };

    expect(res.body).toEqual(expected);
    expect(await Cat.findById(cat.id)).toEqual(expected);
  });
});
