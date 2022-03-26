const pool = require('../utils/pool');

module.exports = class Music {
  id;
  artist;
  favorite_song;

  constructor(row) {
    this.id = row.id;
    this.artist = row.artist;
    this.favorite_song = row.favorite_song;
  }

  static async insert({ artist, favorite_song }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
      music (artist, favorite_song)
      VALUES 
      ($1, $2)
      RETURNING
      *
      `,
      [artist, favorite_song]
    );
    return new Music(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          music
          `
    );
    return rows.map((row) => new Music(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
        *
        FROM
        music
        WHERE
        id=$1
      `,
      [id]
    );
    return new Music(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingMusic = await Music.findById(id);
    const updatedMusic = { ...existingMusic, ...attributes };
    const { artist, favorite_song } = updatedMusic;
    const { rows } = await pool.query(
      `
        UPDATE
        music
        SET
        artist=$1,
        favorite_song=$2
        WHERE
        id=$3
        RETURNING
        *
      `,
      [artist, favorite_song, id]
    );
    return new Music(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
        music
        WHERE
        id=$1
        RETURNING
        *
      `,
      [id]
    );
    return new Music(rows[0]);
  }
};
