const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Venue = require('../lib/models/Venue');

describe('venues routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a venue', async () => {
    const expected = {
      id: '1',
      name: 'Holocene',
      size: 'medium',
      address: '1001 SE Morrison St, Portland, OR 97214',
    };
    const res = await request(app).post('/api/v1/venues').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a list of venues', async () => {
    const venue1 = await Venue.insert({
      id: '1',
      name: 'Holocene',
      size: 'medium',
      address: '1001 SE Morrison St, Portland, OR 97214',
    });
    const venue2 = await Venue.insert({
      id: '2',
      name: 'Moda Center',
      size: 'large',
      address: '1 N Center Ct st, Portland, OR, 97227',
    });

    const res = await request(app).get('/api/v1/venues');

    expect(res.body).toEqual([venue1, venue2]);
  });
});
