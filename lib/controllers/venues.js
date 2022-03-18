const { Router } = require('express');
const Venue = require('../models/Venue');

module.exports = Router().post('/', async (req, res) => {
  const venue = await Venue.insert(req.body);

  res.send(venue);
});
