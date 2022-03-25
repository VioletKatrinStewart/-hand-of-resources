const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .post('/', async (req, res) => {
    const pet = await Pet.insert(req.body);

    res.send(pet);
  })

  .get('/', async (res) => {
    const pets = await Pet.findAll();
    res.send(pets);
  });
