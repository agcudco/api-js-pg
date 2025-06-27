const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const autorRoutes = require('./routes/autorRoutes');
const libroRoutes = require('./routes/libroRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', autorRoutes);
app.use('/api', libroRoutes);

module.exports = app;