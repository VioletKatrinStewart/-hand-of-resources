const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates an an alien', async () => {
    const expected = {
      number_of_eyes: 7,
      color: 'purple',
      location_sigthed: 'Arizona',
    };
    const res = await request(app).post('/api/v5/aliens').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates music', async () => {
    const expected = {
      artist: 'Sophie',
      favorite_song: 'Bipp',
    };
    const res = await request(app).post('/api/v1/music').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates a pet', async () => {
    const expected = {
      name: 'Neko',
      species: 'cat',
      age: 10,
      color: 'grey',
    };
    const res = await request(app).post('/api/v4/pets').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates a plant', async () => {
    const expected = {
      species: 'Dicentra spectabilis',
      common_name: 'bleeding-heart',
    };
    const res = await request(app).post('/api/v3/plants').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates a venue', async () => {
    const expected = {
      name: 'Holocene',
      size: 'medium',
      address: '1001 SE Morrison St, Portland, OR 97214',
    };
    const res = await request(app).post('/api/v2/venues').send(expected);

    expect(res.body).toEqual(expected);
  });
});
