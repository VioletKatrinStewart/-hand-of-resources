const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pet = require('../lib/models/Pet');

describe('aliens routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a pet', async () => {
    const expected = {
      id: '1',
      name: 'Neko',
      species: 'cat',
      age: 10,
      color: 'grey',
    };
    const res = await request(app).post('/api/v1/pets').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a list of pets', async () => {
    const pet1 = await Pet.insert({
      id: '1',
      name: 'Neko',
      species: 'Cat',
      age: 10,
      color: 'grey',
    });
    const pet2 = await Pet.insert({
      id: '2',
      name: 'Pixie',
      species: 'Cat',
      age: 10,
      color: 'grey',
    });
    const res = await request(app).get('/api/v1/pets');

    expect(res.body).toEqual([pet1, pet2]);
  });
});
