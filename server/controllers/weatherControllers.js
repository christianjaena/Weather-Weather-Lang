const axios = require('axios');
const METAWEATHER_API = 'https://www.metaweather.com/api/location';

function axiosGetServerResponse(url, res) {
  axios
    .get(url)
    .then((response) => res.status(200).json(response.data))
    .catch((error) => res.status(400).json(error.message));
}

const locationSearchController = (req, res) => {
  const { city } = req.body;
  axiosGetServerResponse(`${METAWEATHER_API}/search/?query=${city}`, res);
};

const coordinatesSearchController = (req, res) => {
  const { latitude, longitude } = req.body;
  axiosGetServerResponse(
    `${METAWEATHER_API}/search/?lattlong=${latitude},${longitude}`,
    res
  );
};

const locationInfoController = (req, res) => {
  const { id } = req.body;
  axiosGetServerResponse(`${METAWEATHER_API}/${id}`, res);
};

const locationDayInfoController = (req, res) => {
  const { id, year, month, day } = req.body;
  axiosGetServerResponse(
    `${METAWEATHER_API}/${id}/${year}/${month}/${day}`,
    res
  );
};

module.exports = {
  locationSearchController,
  coordinatesSearchController,
  locationInfoController,
  locationDayInfoController,
};
