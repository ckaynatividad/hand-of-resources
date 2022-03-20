const pool = require('../utils/pool');

module.exports = class Anime {
  id;
  title;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
  }

  static async insert({ title, genre }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO animes (title, genre) VALUES ($1, $2) RETURNING *;',
        [title, genre]
      );
      return new Anime(rows[0]);
    } catch (error) {
      return null;
    }
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM animes');
    return rows.map((row) => new Anime(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM animes WHERE id=$1', [id]);
    return new Anime(rows[0]);
  }
};
