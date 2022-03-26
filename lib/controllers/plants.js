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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const plant = await Plant.findById(req.params.id);
      res.send(plant);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const plant = await Plant.updateById(req.params.id, req.body);
    res.send(plant);
  })

  .delete('/:id', async (req, res) => {
    const plant = await Plant.deleteById(req.params.id);
    res.send(plant);
  });
