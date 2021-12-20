const express = require('express');
const route = express.Router();

const {
  registerUserController,
  deleteUsersController,
  loginUserController,
} = require('../controllers/userControllers.js');


route.post('/register', registerUserController);
route.post('/login', loginUserController);
route.delete('/', deleteUsersController);

module.exports = route;
