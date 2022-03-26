const pool = require('../utils/pool');

module.exports = class Plant {
  id;
  species;
  common_name;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.common_name = row.common_name;
  }

  static async insert({ species, common_name }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
      plants (species, common_name)
      VALUES 
      ($1, $2)
      RETURNING
      *
      `,
      [species, common_name]
    );
    return new Plant(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          plants
          `
    );
    return rows.map((row) => new Plant(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
        *
        FROM
        plants
        WHERE
        id=$1
      `,
      [id]
    );
    return new Plant(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingPlant = await Plant.findById(id);
    const updatedPlant = { ...existingPlant, ...attributes };
    const { species, common_name } = updatedPlant;
    const { rows } = await pool.query(
      `
        UPDATE
        plants
        SET
        species=$1,
        common_name=$2
        WHERE
        id=$3
        RETURNING
        *
      `,
      [species, common_name, id]
    );
    return new Plant(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
      plants
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id]
    );
    return new Plant(rows[0]);
  }
};
