const express = require('express');
const route = express.Router();

const {
	getController,
	getByIdController,
	postController,
	updateController,
	deleteController,
	deleteByIdController,
} = require('../controllers/Controllers.js');

route.get('/', getController);

route.get('/:id', getByIdController);

route.post('/', postController);

route.put('/:id', updateController);

route.delete('/', deleteController);

route.delete('/:id', deleteByIdController);

module.exports = route;
