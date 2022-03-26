const pool = require('../utils/pool');

module.exports = class Alien {
  id;
  number_of_eyes;
  color;
  location_sighted;

  constructor(row) {
    this.id = row.id;
    this.number_of_eyes = row.number_of_eyes;
    this.color = row.color;
    this.location_sighted = row.location_sighted;
  }

  static async insert({ number_of_eyes, color, location_sighted }) {
    const { rows } = await pool.query(
      `
        INSERT INTO 
        aliens (number_of_eyes, color, location_sighted)
        VALUES 
        ($1, $2, $3)
        RETURNING
        *
      `,
      [number_of_eyes, color, location_sighted]
    );
    return new Alien(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          aliens
        `
    );
    return rows.map((row) => new Alien(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          aliens
          WHERE
          id=$1
        `,
      [id]
    );
    return new Alien(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingAlien = await Alien.findById(id);
    const updatedAlien = { ...existingAlien, ...attributes };
    const { number_of_eyes, color, location_sighted } = updatedAlien;
    const { rows } = await pool.query(
      `
          UPDATE
          aliens
          SET
          number_of_eyes=$1,
          color=$2,
          location_sighted=$3
          WHERE
          id=$4
          RETURNING
          *
        `,
      [number_of_eyes, color, location_sighted, id]
    );
    return new Alien(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          aliens
          WHERE
          id=$1
          RETURNING
          *
        `,
      [id]
    );
    return new Alien(rows[0]);
  }
};
