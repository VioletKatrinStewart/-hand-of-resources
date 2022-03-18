const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/music', require('./controllers/music.js'));
app.use('/api/v2/venues', require('./controllers/venues'));
app.use('/api/v3/plants', require('./controllers/plants'));
app.use('/api/v4/pets', require('./controllers/pets'));
app.use('/api/v5/aliens', require('./controllers/aliens'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
