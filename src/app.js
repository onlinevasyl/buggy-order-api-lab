const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use('/api/v1/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({ message });
});

module.exports = app;
