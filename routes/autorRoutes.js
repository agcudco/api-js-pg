const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

router.get('/autores', autorController.getAllAutores);
router.get('/autores/:id', autorController.getAutorById);
router.post('/autores', autorController.createAutor);
router.put('/autores/:id', autorController.updateAutor);
router.delete('/autores/:id', autorController.deleteAutor);

module.exports = router;