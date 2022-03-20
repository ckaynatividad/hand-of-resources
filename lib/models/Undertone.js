const pool = require('../utils/pool');

module.exports = class Undertone {
  id;
  tone;
  color;

  constructor(row) {
    this.id = row.id;
    this.tone = row.tone;
    this.color = row.color;
  }

  static async insert({ tone, color }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO undertones(tone, color) VALUES ($1, $2) RETURNING *;',
        [tone, color]
      );
      return new Undertone(rows[0]);
    } catch (error) {
      return null;
    }
  }
};
