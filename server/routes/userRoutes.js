const express = require('express');
const route = express.Router();

const {
  registerUserController,
  deleteUsersController,
  loginUserController,
  getUserInfoController,
} = require('../controllers/userControllers.js');

route.post('/register', registerUserController);
route.post('/login', loginUserController);
route.get('/:id', getUserInfoController);
route.delete('/', deleteUsersController);

module.exports = route;
