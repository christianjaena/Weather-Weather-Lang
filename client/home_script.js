import { postHTTPRequest } from './libraries/postHTTPRequest.js';
const logoutButton = document.getElementById('logoutButton');
const username = document.getElementById('username');
const location = document.getElementById('location');
const userID = localStorage.getItem('userID');

const city = document.getElementById('cityInput');
const citySearchButton = document.getElementById('citySearchButton');
const citiesNearMyCoordinates = document.getElementById(
  'citiesNearMyCoordinatesButton'
);
let results = document.getElementById('results');
let currentLocationStatus = document.getElementById('current');

const latitudeInput = document.getElementById('latitudeInput');
const longitudeInput = document.getElementById('longitudeInput');
const coordinatesSearchButton = document.getElementById(
  'coordinatesSearchButton'
);

let userLatitude, userLongitude;

username.innerHTML += `
<span class="userName">
<a href="http://localhost:3000/user">${localStorage.getItem(
  'username'
)}</a> </span>`;


citiesNearMyCoordinates.addEventListener('click', async () => {
  await getCitiesNearMyLocation(userLatitude, userLongitude);
});

coordinatesSearchButton.addEventListener('click', async () => {
  await getCitiesNearMyLocation(latitudeInput.value, longitudeInput.value);
});

citySearchButton.addEventListener('click', async () => {
  await getCitiesSearch(city.value);
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

async function getCitiesSearch(city) {
  results.innerHTML = '<h1>Loading Results ...</h1>';
  window.scrollTo(0, document.body.scrollHeight);
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/location',
    {
      city,
    }
  );
  // LINQ - arr.first()
  let result = response.first();
  if (result.length === 0) {
    window.alert('City not found in the database.');
  } else {
    await getCityInfo(result);
  }
}

async function getCitiesNearMyLocation(latitude, longitude) {
  results.innerHTML = '<h1 id="loading">Loading Results ...</h1>';
  window.scrollTo(0, document.body.scrollHeight);
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/coordinates',
    { latitude, longitude }
  );

  // LINQ - arr.first()
  let result = response.first();
  await getCityInfo(result);
}

function setListener(attr) {
  let elements = document.querySelectorAll(attr);
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      localStorage.setItem('woeid', element.id);
      window.location.href = 'http://localhost:3000/city';
    });
  });
}
async function getCityInfo(cities) {
  let resultHTML = '<h1>Search Result(s)</h1>';
  for (let index = 0; index < cities.length; index++) {
    let woeid = cities[index].woeid;
    let res = await postHTTPRequest(
      'http://localhost:3000/weather/info/location',
      { id: woeid }
    );
    let data = res.first();
    resultHTML += `
      <h4>${data.title} ${data.location_type}</h4>
      <h5>${data.parent.title}</h5>
      <p>Timezone: ${data.timezone}</p>
      <p>Coordinates: ${data.latt_long}</p>
      <button id=${woeid} class="info btn btn-danger">Weather Details</button>
      `;
  }
  results.innerHTML = resultHTML;
  setListener('.info');
}

async function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
  location.innerHTML =
    `<div class="current-position"> Latitude: </div> 
    <div class="current-position-value"> ${userLatitude} </div>
    <div class="current-position"> Longitude:  </div>  
    <div class="current-position-value"> ${userLongitude} </div>`;
  currentLocationStatus.innerHTML =
    '<h3>Fetching Current Location Status ...</h3>';
  let response = await postHTTPRequest(
    'http://localhost:3000/weather/search/coordinates',
    { latitude: userLatitude, longitude: userLongitude }
  );
  // LINQ - arr.first()
  let result = response.first();
  let current = result.first();
  let res = await postHTTPRequest(
    'http://localhost:3000/weather/info/location',
    { id: current.woeid }
  );
  // LINQ - arr.first()
  let data = res.first();
  let day = data.consolidated_weather.first()
  currentLocationStatus.innerHTML = `
      <div class="currentWeather" >
        <div class="box1">
          <h4>${data.title} ${data.location_type}</h4>
          <h5>${data.parent.title}</h5>
          <p>Timezone: ${data.timezone}</p>
          <p>Coordinates: ${data.latt_long}</p>
        </div>
        <div class="box2">
          <h3>Weather Condition: ${day.weather_state_name}</h3>
          <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" height="100" width="100"/>
        </div>      
      </div>`;
}

(async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    location.innerHTML = 'Geolocation is not supported by this browser.';
  }
})();
