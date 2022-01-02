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
  results.innerHTML = '<h1>Search Result(s)</h1>';
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/location',
    {
      city: city.value,
    }
  );
  // LINQ - arr.first()
  let result = response.first();
  if (result.length === 0) {
    window.alert('City not found in the database.');
  } else {
    result.forEach((res) => {
      results.innerHTML += `<a href="#">${res.title} ${res.location_type}</a><br>`;
    });
  }
});

async function getCitiesNearMyLocation(latitude, longitude) {
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/coordinates',
    { latitude, longitude }
  );

  results.innerHTML = '<h1>Cities Near Your Coordinates</h1><br/>';
  // LINQ - arr.first()
  let result = response.first();

  result.forEach(async (result) => {
    let res = await postHTTPRequest(
      'http://localhost:3000/weather/info/location',
      { id: result.woeid }
    );
    // LINQ - arr.first()
    let data = res.first();
    results.innerHTML += `
      <h2>${data.parent.title}</h2>
      <h4>${data.title} ${data.location_type}</h4>
      <p>Timezone: ${data.timezone}</p>
      <p>Coordinates: ${data.latt_long}</p>
      `;
    // LINQ - arr.take(), arr.select(), arr.first()
    let weatherInfo = res
      .take(1)
      .select((item) => item.consolidated_weather)
      .first();
    weatherInfo.forEach((day) => {
      results.innerHTML += `
      <p>Date: ${day.applicable_date}</p>
      <p>Weather Condition: ${day.weather_state_name}</p>
      <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" height="100" width="100"/>
      `;
    });
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
