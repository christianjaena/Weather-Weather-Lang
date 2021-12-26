import { postHTTPRequest } from './libraries/postHTTPRequest.js';
const logoutButton = document.getElementById('logoutButton');
const username = document.getElementById('username');
const location = document.getElementById('location');

const city = document.getElementById('cityInput');
const citySearchButton = document.getElementById('citySearchButton');
const results = document.getElementById('results');

const latitudeInput = document.getElementById('latitudeInput');
const longitudeInput = document.getElementById('longitudeInput');
const coordinatesSearchButton = document.getElementById(
  'coordinatesSearchButton'
);

username.innerHTML += `<a href="http://localhost:3000/user">${localStorage.getItem(
  'username'
)}</a>`;

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
  results.innerHTML = '';
  response.forEach((res) => {
    results.innerHTML += `<a href="#">${res.title} ${res.location_type}</a><br>`;
  });
});

coordinatesSearchButton.addEventListener('click', async () => {
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/coordinates',
    { latitude: latitudeInput.value, longitude: longitudeInput.value }
  );
  console.log(response);
  results.innerHTML = '';
  results.innerHTML = '<h1>Cities Near Your Coordinate</h1>';
  response.forEach((res) => {
    results.innerHTML += `<a href="#">${res.title} ${res.location_type}</a><br>`;
  });
});

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    location.innerHTML = 'Geolocation is not supported by this browser.';
  }
})();

function showPosition(position) {
  location.innerHTML =
    'Latitude: ' +
    position.coords.latitude +
    '<br>Longitude: ' +
    position.coords.longitude;
}
