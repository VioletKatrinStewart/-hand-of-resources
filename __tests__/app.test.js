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
      id: '1',
      number_of_eyes: 7,
      color: 'purple',
      location_sighted: 'Arizona',
    };
    const res = await request(app).post('/api/v5/aliens').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates music', async () => {
    const expected = {
      id: '1',
      artist: 'Sophie',
      favorite_song: 'Bipp',
    };
    const res = await request(app).post('/api/v1/music').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates a pet', async () => {
    const expected = {
      id: '1',
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
      id: '1',
      species: 'Dicentra spectabilis',
      common_name: 'bleeding-heart',
    };
    const res = await request(app).post('/api/v3/plants').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('creates a venue', async () => {
    const expected = {
      id: '1',
      name: 'Holocene',
      size: 'medium',
      address: '1001 SE Morrison St, Portland, OR 97214',
    };
    const res = await request(app).post('/api/v2/venues').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a list of aliens', async () => {
    const alien1 = {
      id: '1',
      number_of_eyes: 7,
      color: 'purple',
      location_sighted: 'Arizona',
    };
    const alien2 = {
      id: '2',
      number_of_eyes: 1,
      color: 'green',
      location_sighted: 'California',
    };

    const res = await request(app).get('/api/v1/aliens');

    expect(res.body).toEqual([alien1, alien2]);
  });

  it('gets a list of music', async () => {
    const music1 = {
      id: '1',
      artist: 'Sophie',
      favorite_song: 'Bipp',
    };
    const music2 = {
      id: '2',
      artist: 'Lonelyspeck',
      favorite_song: 'My Angel Goes Before Me',
    };

    const res = await request(app).get('/api/v1/music');

    expect(res.body).toEqual([music1, music2]);
  });

  it('gets a list of pets', async () => {
    const pet1 = {
      id: '1',
      name: 'Neko',
      species: 'Cat',
      age: 10,
      color: 'grey',
    };
    const pet2 = {
      id: '2',
      name: 'Pixie',
      species: 'Cat',
      age: 10,
      color: 'grey',
    };

    const res = await request(app).get('/api/v1/pets');

    expect(res.body).toEqual([pet1, pet2]);
  });

  it('gets a list of plants', async () => {
    const plant1 = {
      id: '1',
      species: 'Dicentra spectabilis',
      common_name: 'bleeding-heart',
    };
    const plant2 = {
      id: '2',
      species: 'Canna generalis',
      common_name: 'Canna Lily',
    };

    const res = await request(app).get('/api/v1/plants');

    expect(res.body).toEqual([plant1, plant2]);
  });

  it('gets a list of venues', async () => {
    const venue1 = {
      id: '1',
      name: 'Holocene',
      size: 'medium',
      address: '1001 SE Morrison St, Portland, OR 97214',
    };
    const venue2 = {
      id: '2',
      name: 'Moda Center',
      size: 'large',
      address: '1 N Center Ct st, Portland, OR, 97227',
    };

    const res = await request(app).get('/api/v1/venues');

    expect(res.body).toEqual([venue1, venue2]);
  });
});
