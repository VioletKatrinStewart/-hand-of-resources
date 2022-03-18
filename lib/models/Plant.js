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
};
