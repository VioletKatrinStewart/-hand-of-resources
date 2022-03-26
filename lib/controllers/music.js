const { Router } = require('express');
const Music = require('../models/Music');

module.exports = Router()
  .post('/', async (req, res) => {
    const music = await Music.insert(req.body);
    res.send(music);
  })

  .get('/', async (req, res) => {
    const music = await Music.findAll();
    res.send(music);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const music = await Music.findById(req.params.id);
      res.send(music);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const music = await Music.updateById(req.params.id, req.body);
    res.send(music);
  })

  .delete('/:id', async (req, res) => {
    const music = await Music.deleteById(req.params.id);
    res.send(music);
  });
