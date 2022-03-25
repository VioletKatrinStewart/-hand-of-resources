const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Alien = require('../lib/models/Alien');

describe('aliens routes', () => {
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
    const res = await request(app).post('/api/v1/aliens').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a list of aliens', async () => {
    const alien1 = await Alien.insert({
      id: '1',
      number_of_eyes: 7,
      color: 'purple',
      location_sighted: 'Arizona',
    });
    const alien2 = await Alien.insert({
      id: '2',
      number_of_eyes: 1,
      color: 'green',
      location_sighted: 'California',
    });

    const res = await request(app).get('/api/v1/aliens');

    expect(res.body).toEqual([alien1, alien2]);
  });

  it('gets an alien by id', async () => {
    const alien1 = await Alien.insert({
      id: '1',
      number_of_eyes: 12,
      color: 'pink',
      location_sighted: 'Alaska',
    });
    const res = await request(app).get(`/api/v1/aliens/${alien1.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...alien1 });
  });

  it('updates an alien by id', async () => {
    await Alien.insert({
      id: '1',
      number_of_eyes: 12,
      color: 'pink',
      location_sighted: 'Alaska',
    });
    const res = await request(app)
      .patch('/api/v1/aliens/1')
      .send({ color: 'orange' });

    expect(res.body).toEqual({
      id: '1',
      number_of_eyes: 12,
      color: 'orange',
      location_sighted: 'Alaska',
    });
  });
});
