const express = require('express');
const route = express.Router();

const {
    locationSearchController,
    coordinatesSearchController,
    locationInfoController,
    locationDayInfoController   
} = require('../controllers/weatherControllers.js');

route.post('/search/location', locationSearchController);
route.post('/search/coordinates', coordinatesSearchController);
route.post('/info/location', locationInfoController);
route.post('/info/location/day', locationDayInfoController);

module.exports = route;
