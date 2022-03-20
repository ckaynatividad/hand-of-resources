const pool = require('../utils/pool');

module.exports = class Show {
  id;
  title;
  watch_app;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.watch_app = row.watch_app;
  }

  static async insert({ title, watch_app }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO shows(title, watch_app) VALUES ($1, $2) RETURNING *;',
        [title, watch_app]
      );
      return new Show(rows[0]);
    } catch (error) {
      return null;
    }
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM shows');
    return rows.map((row) => new Show(row));
  }
};
