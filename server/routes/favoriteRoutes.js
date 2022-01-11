const express = require('express');
const route = express.Router();

const {
  addToFavoritesController,
  getUserFavoritesController,
  deleteUserFavoritesController
} = require('../controllers/favoriteControllers.js');

route.post('/add', addToFavoritesController);
route.get('/:id', getUserFavoritesController);
route.delete('/delete/:id', deleteUserFavoritesController)

module.exports = route;
