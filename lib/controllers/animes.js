const { Router } = require('express');
const Anime = require('../models/Anime');

module.exports = Router().post('/', async (req, res) => {
  const anime = await Anime.insert(req.body);
  res.send(anime);
});
