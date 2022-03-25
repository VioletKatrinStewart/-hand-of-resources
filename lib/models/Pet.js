const pool = require('../utils/pool');

module.exports = class Pet {
  id;
  name;
  species;
  age;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.species = row.species;
    this.age = row.age;
    this.color = row.color;
  }

  static async insert({ name, species, age, color }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
      pets (name, species, age, color)
      VALUES 
      ($1, $2, $3, $4)
      RETURNING
      *
      `,
      [name, species, age, color]
    );
    return new Pet(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          pets
          `
    );
    return rows.map((row) => new Pet(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
        *
        FROM
        pets
        WHERE
        id=$1
      `,
      [id]
    );
    return new Pet(rows[0]);
  }
};
