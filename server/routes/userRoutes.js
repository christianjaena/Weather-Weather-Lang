const express = require('express');
const route = express.Router();

const {
	getUsersController,
	getUserByIdController,
	addUserController,
	updateUserByIdController,
	deleteUsersController,
	deleteUserByIdController,
} = require('../controllers/userControllers.js');

route.get('/', getUsersController);

route.get('/:id', getUserByIdController);

route.post('/', addUserController);

route.put('/:id', updateUserByIdController);

route.delete('/', deleteUsersController);

route.delete('/:id', deleteUserByIdController);

module.exports = route;
