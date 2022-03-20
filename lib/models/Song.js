const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  singer;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.singer = row.singer;
  }

  static async insert({ title, singer }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO songs(title, singer) VALUES ($1, $2) RETURNING *;',
        [title, singer]
      );
      return new Song(rows[0]);
    } catch (error) {
      return null;
    }
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM songs');
    return rows.map((row) => new Song(row));
  }
};
