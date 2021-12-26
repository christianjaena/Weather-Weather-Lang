const express = require('express');
const route = express.Router();

const {
    authUserController,
    logoutUserController
} = require('../controllers/sessionControllers')

route.get('/auth', authUserController);
route.post('/logout', logoutUserController);

module.exports = route;