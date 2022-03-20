const { Router } = require('express');
const Anime = require('../models/Anime');

module.exports = Router()
  .post('/', async (req, res) => {
    const anime = await Anime.insert(req.body);
    res.send(anime);
  })

  .get('/', async (req, res) => {
    const animes = await Anime.findAll();
    res.send(animes);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const anime = await Anime.findById(req.params.id);
      res.send(anime);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const anime = await Anime.updateById(req.params.id, req.body);
    res.send(anime);
  })

  .delete('/:id', async (req, res) => {
    const anime = await Anime.deleteById(req.params.id);
    res.send(anime);
  });
