const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .post('/', async (req, res) => {
    const pet = await Pet.insert(req.body);

    res.send(pet);
  })

  .get('/', async (req, res) => {
    const pets = await Pet.findAll();
    res.send(pets);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.findById(req.params.id);
      res.send(pet);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const pet = await Pet.updateById(req.params.id, req.body);
    res.send(pet);
  })

  .delete('/:id', async (req, res) => {
    const pet = await Pet.deleteById(req.params.id);
    res.send(pet);
  });
