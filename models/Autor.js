const pool = require('../config/db');

class Autor {
  constructor({ id_autor, nombre, apellidos, fecha_nacimiento, nacionalidad, biografía }) {
    this.id_autor = id_autor;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fecha_nacimiento = fecha_nacimiento;
    this.nacionalidad = nacionalidad;
    this.biografía = biografía;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM autor');
    return result.rows.map(row => new Autor(row));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM autor WHERE id_autor = $1', [id]);
    if (result.rowCount === 0) return null;
    return new Autor(result.rows[0]);
  }

  static async create(data) {
    const { nombre, apellidos, fecha_nacimiento, nacionalidad, biografía } = data;
    const query = `
      INSERT INTO autor (nombre, apellidos, fecha_nacimiento, nacionalidad, biografía)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [nombre, apellidos, fecha_nacimiento, nacionalidad, biografía];
    const result = await pool.query(query, values);
    return new Autor(result.rows[0]);
  }

  static async update(id, data) {
    const { nombre, apellidos, fecha_nacimiento, nacionalidad, biografía } = data;
    const query = `
      UPDATE autor SET
        nombre = $1,
        apellidos = $2,
        fecha_nacimiento = $3,
        nacionalidad = $4,
        biografía = $5
      WHERE id_autor = $6
      RETURNING *`;
    const values = [nombre, apellidos, fecha_nacimiento, nacionalidad, biografía, id];
    const result = await pool.query(query, values);
    return new Autor(result.rows[0]);
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM autor WHERE id_autor = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Autor;