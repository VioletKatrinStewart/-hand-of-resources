const venues = require('../controllers/venues');
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

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
        *
        FROM
        venues
        WHERE
        id=$1
      `,
      [id]
    );
    return new Venue(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingVenue = await Venue.findById(id);
    const updatedVenue = { ...existingVenue, ...attributes };
    const { name, size, address } = updatedVenue;
    const { rows } = await pool.query(
      `
        UPDATE
        venues
        SET
        name=$1,
        size=$2,
        address=$3
        WHERE
        id=$4
        RETURNING
        *
      `,
      [name, size, address, id]
    );
    return new Venue(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
      venues
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id]
    );
    return new Venue(rows[0]);
  }
};
