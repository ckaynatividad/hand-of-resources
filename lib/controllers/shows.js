const { Router } = require('express');
const Show = require('../models/Show');

module.exports = Router()
  .post('/', async (req, res) => {
    const show = await Show.insert(req.body);
    res.send(show);
  })

  .get('/', async (req, res) => {
    const shows = await Show.findAll();
    res.send(shows);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const show = await Show.findById(req.params.id);
      res.send(show);
    } catch (error) {
      next(error);
    }
  });
