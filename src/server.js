const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let shuttingDown = false;

const shutdown = () => {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log('Shutting down server');
    server.close(error => {
        if (error) {
            console.error('Error while shutting down server:', error);
            process.exitCode = 1;
        }
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
