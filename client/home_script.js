import { postHTTPRequest } from './libraries/postHTTPRequest.js';
const logoutButton = document.getElementById('logoutButton');
const username = document.getElementById('username');
const location = document.getElementById('location');

const city = document.getElementById('cityInput');
const citySearchButton = document.getElementById('citySearchButton');
const citiesNearMyCoordinates = document.getElementById(
  'citiesNearMyCoordinatesButton'
);
const results = document.getElementById('results');

const latitudeInput = document.getElementById('latitudeInput');
const longitudeInput = document.getElementById('longitudeInput');
const coordinatesSearchButton = document.getElementById(
  'coordinatesSearchButton'
);

let userLatitude, userLongitude;

username.innerHTML += `<a href="http://localhost:3000/user">${localStorage.getItem(
  'username'
)}</a>`;

citiesNearMyCoordinates.addEventListener('click', async () => {
  await getCitiesNearMyLocation(userLatitude, userLongitude);
});

coordinatesSearchButton.addEventListener('click', async () => {
  await getCitiesNearMyLocation(latitudeInput.value, longitudeInput.value);
});

logoutButton.addEventListener('click', async () => {
  let postRequest = await fetch('http://localhost:3000/session/logout', {
    method: 'POST',
  });
  let response = await postRequest;
  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  if (response.redirected) {
    window.location.href = response.url;
  }
});

citySearchButton.addEventListener('click', async () => {
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/location',
    {
      city: city.value,
    }
  );
  results.innerHTML = '<h1>Search Result(s)</h1>';
  response.forEach((res) => {
    results.innerHTML += `<a href="#">${res.title} ${res.location_type}</a><br>`;
  });
});

async function getCitiesNearMyLocation(latitude, longitude) {
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/coordinates',
    { latitude, longitude }
  );
  results.innerHTML = '<h1>Cities Near Your Coordinates</h1>';
  response.forEach((res) => {
    results.innerHTML += `<a href="#">${res.title} ${res.location_type}</a><p>Distance (Meters): ${res.distance}</p><p>Coordinates: ${res.latt_long}</p> <br/>`;
  });
}

function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
  location.innerHTML =
    'Latitude: ' + userLatitude + '<br>Longitude: ' + userLongitude;
}

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    location.innerHTML = 'Geolocation is not supported by this browser.';
  }
})();
