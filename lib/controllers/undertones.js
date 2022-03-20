const { Router } = require('express');
const Undertone = require('../models/Undertone');

module.exports = Router()
  .post('/', async (req, res) => {
    const undertone = await Undertone.insert(req.body);
    res.send(undertone);
  })
  .get('/', async (req, res) => {
    const undertones = await Undertone.findAll();
    res.send(undertones);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const undertone = await Undertone.findById(req.params.id);
      res.send(undertone);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const undertone = await Undertone.updateById(req.params.id, req.body);
    res.send(undertone);
  })

  .delete('/:id', async (req, res) => {
    const undertone = await Undertone.deleteById(req.params.id);
    res.send(undertone);
  });
