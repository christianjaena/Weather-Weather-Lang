const express = require('express');
const route = express.Router();

const {
  registerUserController,
  deleteUsersController,
  loginUserController,
  getUserInfoController,
  updateUserController
} = require('../controllers/userControllers.js');

route.delete('/', deleteUsersController);
route.post('/register', registerUserController);
route.post('/login', loginUserController);
route.put('/:id', updateUserController);
route.get('/:id', getUserInfoController);

module.exports = route;
