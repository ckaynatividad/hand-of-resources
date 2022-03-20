const setup = require('../data/setup');
const pool = require('../lib/utils/pool');

describe('animes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});
