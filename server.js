const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
pool.connect((err) => {
    if (err) {
        console.error('Error conectando a la BD:', err.stack);
    } else {
        console.log('Conectado a la base de datos PostgreSQL');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});