const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.type = row.type;
  }

  static async insert({ name, age, type }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO cats(name, age, type) VALUES ($1, $2, $3) RETURNING *;',
        [name, age, type]
      );
      return new Cat(rows[0]);
    } catch (error) {
      return null;
    }
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM cats');
    return rows.map((row) => new Cat(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [id]);
    return new Cat(rows[0]);
  }
};
