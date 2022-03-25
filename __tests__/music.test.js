const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Music = require('../lib/models/Music');

describe('music routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
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

  it('gets a list of music', async () => {
    const music1 = await Music.insert({
      id: '1',
      artist: 'Sophie',
      favorite_song: 'Bipp',
    });
    const music2 = await Music.insert({
      id: '2',
      artist: 'Lonelyspeck',
      favorite_song: 'My Angel Goes Before Me',
    });

    const res = await request(app).get('/api/v1/music');

    expect(res.body).toEqual([music1, music2]);
  });
});
