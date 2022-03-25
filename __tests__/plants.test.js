const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');

describe('aliens routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a plant', async () => {
    const expected = {
      id: '1',
      species: 'Dicentra spectabilis',
      common_name: 'bleeding-heart',
    };
    const res = await request(app).post('/api/v1/plants').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a list of plants', async () => {
    const plant1 = await Plant.insert({
      id: '1',
      species: 'Dicentra spectabilis',
      common_name: 'bleeding-heart',
    });
    const plant2 = await Plant.insert({
      id: '2',
      species: 'Canna generalis',
      common_name: 'Canna Lily',
    });

    const res = await request(app).get('/api/v1/plants');

    expect(res.body).toEqual([plant1, plant2]);
  });
});
