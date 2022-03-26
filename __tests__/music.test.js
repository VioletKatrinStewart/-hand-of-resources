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

  it('gets muisc by id', async () => {
    const music1 = await Music.insert({
      id: '1',
      artist: 'Vashti Bunyan',
      favorite_song: '17 Pink Sugar Elephants',
    });
    const res = await request(app).get(`/api/v1/music/${music1.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...music1 });
  });

  it('updates music by id', async () => {
    await Music.insert({
      id: '1',
      artist: 'Mitski',
      favorite_song: 'I Bet On Losing Dogs',
    });
    const res = await request(app)
      .patch('/api/v1/music/1')
      .send({ favorite_song: 'Your Best American Girl' });

    expect(res.body).toEqual({
      id: '1',
      artist: 'Mitski',
      favorite_song: 'Your Best American Girl',
    });
  });

  it('deletes music by id', async () => {
    const music1 = await Music.insert({
      id: '1',
      artist: 'Rosie Tucker',
      favorite_song: 'Ambrosia',
    });
    const res = await request(app).delete(`/api/v1/music/${music1.id}`);
    expect(res.body).toEqual(music1);
  });
});
