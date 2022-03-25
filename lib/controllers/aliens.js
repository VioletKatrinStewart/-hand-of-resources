const { Router } = require('express');
const Alien = require('../models/Alien');

module.exports = Router()
  .post('/', async (req, res) => {
    const alien = await Alien.insert(req.body);
    res.send(alien);
  })

  .get('/', async (req, res) => {
    const aliens = await Alien.findAll();
    res.send(aliens);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const alien = await Alien.findById(req.params.id);
      res.send(alien);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
