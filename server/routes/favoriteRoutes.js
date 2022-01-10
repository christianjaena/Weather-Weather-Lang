const express = require('express');
const route = express.Router();

const {
  addToFavoritesController,
  getUserFavoritesController,
} = require('../controllers/favoriteControllers.js');

route.post('/add', addToFavoritesController);
route.get('/:id', getUserFavoritesController);

module.exports = route;
