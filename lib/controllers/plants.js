const { Router } = require('express');
const Plant = require('../models/Plant');

module.exports = Router()
  .post('/', async (req, res) => {
    const plant = await Plant.insert(req.body);

    res.send(plant);
  })

  .get('/', async (req, res) => {
    const plants = await Plant.findAll();
    res.send(plants);
  });
