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
  });
