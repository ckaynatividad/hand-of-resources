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

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM songs WHERE id=$1', [id]);
    return new Song(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentSong = await Song.findById(id);
    const updatedAttributes = { ...currentSong, ...attributes };
    const { title, singer } = updatedAttributes;
    const { rows } = await pool.query(
      'UPDATE songs SET title=$1, singer=$2 WHERE id=$3 RETURNING *',
      [title, singer, id]
    );
    return new Song(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM songs WHERE id=$1 RETURNING *',
      [id]
    );
    return new Song(rows[0]);
  }
};
