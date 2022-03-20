const setup = require('../data/setup');
const pool = require('../lib/utils/pool');

describe('shows routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});
