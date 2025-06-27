const pool = require('../config/db');

class Libro {
    constructor({ id_libro, id_autor, título, género, fecha_publicación, editorial, isbn, número_páginas }) {
        this.id_libro = id_libro;
        this.id_autor = id_autor;
        this.título = título;
        this.género = género;
        this.fecha_publicación = fecha_publicación;
        this.editorial = editorial;
        this.isbn = isbn;
        this.número_páginas = número_páginas;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM libro');
        return result.rows.map(row => new Libro(row));
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM libro WHERE id_libro = $1', [id]);
        if (result.rowCount === 0) return null;
        return new Libro(result.rows[0]);
    }

    static async create(data) {
        const {
            id_autor, título, género, fecha_publicación,
            editorial, isbn, número_páginas
        } = data;

        const query = `
      INSERT INTO libro (
        id_autor, título, género, fecha_publicación,
        editorial, isbn, número_páginas
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

        const values = [
            id_autor, título, género, fecha_publicación,
            editorial, isbn, número_páginas
        ];

        const result = await pool.query(query, values);
        return new Libro(result.rows[0]);
    }

    static async update(id, data) {
        const {
            id_autor, título, género, fecha_publicación,
            editorial, isbn, número_páginas
        } = data;

        const query = `
      UPDATE libro SET
        id_autor = $1,
        título = $2,
        género = $3,
        fecha_publicación = $4,
        editorial = $5,
        isbn = $6,
        número_páginas = $7
      WHERE id_libro = $8
      RETURNING *`;

        const values = [
            id_autor, título, género, fecha_publicación,
            editorial, isbn, número_páginas, id
        ];

        const result = await pool.query(query, values);
        return new Libro(result.rows[0]);
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM libro WHERE id_libro = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    }
}

module.exports = Libro;