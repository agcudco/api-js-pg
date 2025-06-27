const Libro = require('../models/Libro');

exports.getAllLibros = async (req, res) => {
    try {
        const libros = await Libro.getAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLibroById = async (req, res) => {
    try {
        const libro = await Libro.getById(req.params.id);
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLibro = async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.update(req.params.id, req.body);
        if (!libroActualizado) return res.status(404).json({ message: 'Libro no encontrado' });
        res.json(libroActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLibro = async (req, res) => {
    try {
        const deleted = await Libro.delete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Libro no encontrado' });
        res.json({ message: 'Libro eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};