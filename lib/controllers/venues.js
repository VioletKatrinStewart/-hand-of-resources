const { Router } = require('express');
const Venue = require('../models/Venue');

module.exports = Router()
  .post('/', async (req, res) => {
    const venue = await Venue.insert(req.body);

    res.send(venue);
  })

  .get('/', async (req, res) => {
    const venues = await Venue.findAll();
    res.send(venues);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const venue = await Venue.findById(req.params.id);
      res.send(venue);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const venue = await Venue.updateById(req.params.id, req.body);
    res.send(venue);
  })

  .delete('/:id', async (req, res) => {
    const venue = await Venue.deleteById(req.params.id);
    res.send(venue);
  });
