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
  });
