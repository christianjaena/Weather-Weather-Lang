const express = require('express');
const route = express.Router();

const {
  addToFavoritesController,
} = require('../controllers/favoriteControllers.js');

route.post('/add', addToFavoritesController);

module.exports = route;
