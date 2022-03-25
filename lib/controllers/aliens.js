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
  });
