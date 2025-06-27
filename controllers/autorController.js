const Autor = require('../models/Autor');

exports.getAllAutores = async (req, res) => {
    try {
        const autores = await Autor.getAll();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAutorById = async (req, res) => {
    try {
        const autor = await Autor.getById(req.params.id);
        if (!autor) return res.status(404).json({ message: 'Autor no encontrado' });
        res.json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAutor = async (req, res) => {
    try {
        const nuevoAutor = await Autor.create(req.body);
        res.status(201).json(nuevoAutor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.update(req.params.id, req.body);
        if (!autorActualizado) return res.status(404).json({ message: 'Autor no encontrado' });
        res.json(autorActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAutor = async (req, res) => {
    try {
        const deleted = await Autor.delete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Autor no encontrado' });
        res.json({ message: 'Autor eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};