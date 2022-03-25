const pool = require('../utils/pool');

module.exports = class Venue {
  id;
  name;
  size;
  address;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.size = row.size;
    this.address = row.address;
  }

  static async insert({ name, size, address }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
      venues (name, size, address)
      VALUES 
      ($1, $2, $3)
      RETURNING
      *
      `,
      [name, size, address]
    );
    return new Venue(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          venues
          `
    );
    return rows.map((row) => new Venue(row));
  }
};
